export interface PublishedIconProps {
  className?: string;
}

export const PublishedIcon = ({ className }: PublishedIconProps) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="8.66663" cy="8" r="8" fill="#44FF00" />
    </svg>
  );
};
