import {
  BookmarkIcon,
  CheckCircle2Icon,
  Clock3Icon,
  PlusIcon,
} from "lucide-react";
import OngoingNovelReads from "./content/ongoing";
import BookmarkedChapters from "./content/bookmarked";
import NovelsToRead from "./content/to-read";
import CompletedNovels from "./content/completed";

const tabsTriggers = [
  {
    name: "Ongoing",
    value: "ongoing",
    icon: Clock3Icon,
    content: <OngoingNovelReads />,
  },
  {
    name: "Bookmarked",
    value: "bookmarked",
    icon: BookmarkIcon,
    content: <BookmarkedChapters />,
  },
  {
    name: "To-read",
    value: "toRead",
    icon: PlusIcon,
    content: <NovelsToRead />,
  },
  {
    name: "Completed",
    value: "completed",
    icon: CheckCircle2Icon,
    content: <CompletedNovels />,
  },
];

export default tabsTriggers;
