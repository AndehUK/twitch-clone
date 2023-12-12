import type { LayoutProps } from "@/types/layout";
import { Logo } from "./_components/logo";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
