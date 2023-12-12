import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/env";
import { db } from "@/server/db";
import type { UserWebhookEvent } from "@/types/webhooks";

const getCurrentUser = async ({ id }: { id: string }) => {
  return await db.user.findUnique({
    where: {
      externalUserId: id,
    },
  });
};

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from the Clerk Dashboard to your .env file.",
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_signature = headerPayload.get("svix-signature");
  const svix_timestamp = headerPayload.get("svix-timestamp");

  if (!svix_id || !svix_signature || !svix_timestamp) {
    return new NextResponse("Error occured -- no svix headers.", {
      status: 400,
    });
  }

  const payload = (await req.json()) as UserWebhookEvent;
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new NextResponse("Error occured", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  } else if (eventType === "user.updated") {
    const currentUser = await getCurrentUser({ id: payload.data.id });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    } else {
      await db.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          username: payload.data.username,
          imageUrl: payload.data.image_url,
        },
      });
    }
  } else if (eventType === "user.deleted") {
    const currentUser = await getCurrentUser({ id: payload.data.id });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    } else {
      await db.user.delete({
        where: {
          externalUserId: payload.data.id,
        },
      });
    }
  }

  return new NextResponse("", { status: 200 });
}
