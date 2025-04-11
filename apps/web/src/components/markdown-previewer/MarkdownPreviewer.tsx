import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
  className?: string;
};

const MarkdownPreviewer = ({ content, className }: Props) => {
  return <ReactMarkdown className={className || ""}>{content}</ReactMarkdown>;
};

export default MarkdownPreviewer;
