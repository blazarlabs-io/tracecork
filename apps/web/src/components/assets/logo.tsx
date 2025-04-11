import Image from "next/image";

export interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Image
      src="/images/tracecork-logo-3.svg"
      alt="Logo"
      width={148}
      height={48}
      className={className}
    />
  );
};
