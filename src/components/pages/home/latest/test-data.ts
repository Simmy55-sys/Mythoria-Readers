interface NovelChapter {
  number: string;
  isLocked: boolean;
  daysAgo: string;
}

interface Novel {
  id: number;
  title: string;
  image: string;
  chapters: NovelChapter[];
  isPinned: boolean;
}

const novels: Novel[] = [
  {
    id: 1,
    title: "Demonic Frontline Flying Dragon...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%23FF6B00%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2716%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EDemonic Frontline%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "359", isLocked: true, daysAgo: "1 month" },
      { number: "358", isLocked: true, daysAgo: "1 month" },
      { number: "135", isLocked: false, daysAgo: "13 days" },
      { number: "134", isLocked: false, daysAgo: "13 days" },
    ],
    isPinned: false,
  },
  {
    id: 2,
    title: "Dukedom's Legendary Prodi...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%239D4EDD%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2716%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EDukedom%27s Legendary%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "301", isLocked: true, daysAgo: "19 days" },
      { number: "300", isLocked: true, daysAgo: "19 days" },
      { number: "150", isLocked: false, daysAgo: "18 days" },
      { number: "149", isLocked: false, daysAgo: "18 days" },
    ],
    isPinned: true,
  },
  {
    id: 3,
    title: "Smartphone in Murim Academy",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%23E63946%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3ESmartphone%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "163", isLocked: true, daysAgo: "2 months" },
      { number: "162", isLocked: true, daysAgo: "2 months" },
      { number: "60", isLocked: false, daysAgo: "21 days" },
      { number: "59", isLocked: false, daysAgo: "21 days" },
    ],
    isPinned: true,
  },
  {
    id: 4,
    title: "Omniscient First-Person Viewpoint",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%234A1A5C%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EOmniscient%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "241", isLocked: true, daysAgo: "27 days" },
      { number: "240", isLocked: true, daysAgo: "27 days" },
      { number: "80", isLocked: false, daysAgo: "26 days" },
      { number: "79", isLocked: false, daysAgo: "26 days" },
    ],
    isPinned: true,
  },
  {
    id: 5,
    title: "The Time-Limited Baby Doctor...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%2300A8E8%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EBaby Doctor%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "120", isLocked: true, daysAgo: "2 months" },
      { number: "119", isLocked: true, daysAgo: "2 months" },
      { number: "50", isLocked: false, daysAgo: "27 days" },
      { number: "49", isLocked: false, daysAgo: "27 days" },
    ],
    isPinned: true,
  },
  {
    id: 6,
    title: "I Became An Academy...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%23F4A261%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EAcademy%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "500", isLocked: true, daysAgo: "27 days" },
      { number: "499", isLocked: true, daysAgo: "27 days" },
      { number: "300", isLocked: false, daysAgo: "27 days" },
      { number: "299", isLocked: false, daysAgo: "27 days" },
    ],
    isPinned: true,
  },
  {
    id: 7,
    title: "Regression Is Too Much [Novel]",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%23555555%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3ERegression%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "414", isLocked: true, daysAgo: "27 days" },
      { number: "413", isLocked: true, daysAgo: "27 days" },
      { number: "150", isLocked: false, daysAgo: "27 days" },
      { number: "149", isLocked: false, daysAgo: "27 days" },
    ],
    isPinned: false,
  },
  {
    id: 8,
    title: "I Was Thrown Into An Unfamiliar...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%23E63946%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EUnfamiliar%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "120", isLocked: true, daysAgo: "27 days" },
      { number: "119", isLocked: true, daysAgo: "27 days" },
      { number: "30", isLocked: false, daysAgo: "27 days" },
      { number: "29", isLocked: false, daysAgo: "27 days" },
    ],
    isPinned: true,
  },
  {
    id: 9,
    title: "30 Years Have Passed Since the...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%237A8AA2%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3E30 Years%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "120", isLocked: true, daysAgo: "27 days" },
      { number: "119", isLocked: true, daysAgo: "27 days" },
      { number: "30", isLocked: false, daysAgo: "27 days" },
      { number: "29", isLocked: false, daysAgo: "27 days" },
    ],
    isPinned: false,
  },
  {
    id: 10,
    title: "The Apothecary Diaries",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%23C1666B%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EApothecary%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "95", isLocked: true, daysAgo: "15 days" },
      { number: "94", isLocked: true, daysAgo: "15 days" },
      { number: "50", isLocked: false, daysAgo: "20 days" },
      { number: "49", isLocked: false, daysAgo: "20 days" },
    ],
    isPinned: false,
  },
  {
    id: 11,
    title: "Martial Peak",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%235A2D42%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EMartial Peak%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "2850", isLocked: true, daysAgo: "5 days" },
      { number: "2849", isLocked: true, daysAgo: "5 days" },
      { number: "2100", isLocked: false, daysAgo: "10 days" },
      { number: "2099", isLocked: false, daysAgo: "10 days" },
    ],
    isPinned: false,
  },
  {
    id: 12,
    title: "Return of the Frozen Player",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27280%27%3E%3Crect fill=%27%2348A9A6%27 width=%27200%27 height=%27280%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2714%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EFrozen Player%3C/text%3E%3C/svg%3E")',
    chapters: [
      { number: "380", isLocked: true, daysAgo: "8 days" },
      { number: "379", isLocked: true, daysAgo: "8 days" },
      { number: "200", isLocked: false, daysAgo: "12 days" },
      { number: "199", isLocked: false, daysAgo: "12 days" },
    ],
    isPinned: false,
  },
];

export default novels;
