import { ArchivedIcon } from "@/components/icons/archived";
import { DraftIcon } from "@/components/icons/draft";
import { PublishedIcon } from "@/components/icons/published";

export const statuses = [
  {
    value: "draft",
    label: "Draft",
    icon: DraftIcon,
  },
  {
    value: "published",
    label: "Published",
    icon: PublishedIcon,
  },
  {
    value: "archived",
    label: "Archived",
    icon: ArchivedIcon,
  },
];
