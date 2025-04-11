export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <main>{children}</main>
    </div>
  );
};
