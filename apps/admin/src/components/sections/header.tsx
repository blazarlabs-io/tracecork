type HeaderProps = {
  title: string;
  description: string;
};

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
