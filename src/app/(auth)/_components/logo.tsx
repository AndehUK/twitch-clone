import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Image src="/logo-dark.png" alt="excast" height={50} width={50} />
      <div className={cn("flex flex-col", font.className)}>
        <p className="text-2xl font-semibold">Excast</p>
        <p className="text-sm text-muted-foreground">Let&apos;s Play!</p>
      </div>
    </div>
  );
};
