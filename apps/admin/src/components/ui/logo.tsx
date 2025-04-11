/* eslint-disable @next/next/no-img-element */
export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img src="/images/logo.svg" className="h-8 w-40" alt="Logo" />
      <span className="text-xs mt-2 font-semibold">Admin</span>
    </div>
  );
};
