interface PopularNovel {
  id: number;
  rank: number;
  title: string;
  image: string;
  genres: string[];
}

const popularNovels: PopularNovel[] = [
  {
    id: 1,
    rank: 1,
    title: "Legendary Hero is an Academy Honors Student...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%27%239D4EDD%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3ELegendary%3C/text%3E%3C/svg%3E")',
    genres: ["Action", "School Life", "Fantasy"],
  },
  {
    id: 2,
    rank: 2,
    title: "Demonic Frontline Flying Dragon Thirteen [Novel]",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%27%23FF6B00%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EDemonic%3C/text%3E%3C/svg%3E")',
    genres: ["Action", "Wuxia", "Martial Arts"],
  },
  {
    id: 3,
    rank: 3,
    title: "I Became the Cute One in the Troubleshooter Squad...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%27%23E0AAFF%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%276A4C93%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3ECute One%3C/text%3E%3C/svg%3E")',
    genres: ["MYSTERY", "Action", "Fantasy"],
  },
  {
    id: 4,
    rank: 4,
    title: "Dukedom's Legendary Prodigy [Novel]",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%279D4EDD%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EDukedom%3C/text%3E%3C/svg%3E")',
    genres: ["Action", "Fantasy", "Martial Arts"],
  },
  {
    id: 5,
    rank: 5,
    title: "Surviving as a Mid-Boss Henchman",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%2300A8E8%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EMid-Boss%3C/text%3E%3C/svg%3E")',
    genres: ["Action", "Romance", "Fantasy"],
  },
  {
    id: 6,
    rank: 6,
    title: "How to Get on the Main Character's Flower Path",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%27%23C1666B%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EFlower%3C/text%3E%3C/svg%3E")',
    genres: ["MYSTERY", "Action", "Romance"],
  },
  {
    id: 7,
    rank: 7,
    title: "I Became a Motivational Demon Sword in a Martial...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%27%23E63946%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EDemon Sword%3C/text%3E%3C/svg%3E")',
    genres: ["Action", "Martial Arts"],
  },
  {
    id: 8,
    rank: 8,
    title: "Academy Retirement Diary of the Student Council...",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%27%23E0AAFF%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%276A4C93%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EAcademy%3C/text%3E%3C/svg%3E")',
    genres: ["Action", "School Life", "Fantasy"],
  },
  {
    id: 9,
    rank: 9,
    title: "Hobbyist VTuber",
    image:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27120%27%3E%3Crect fill=%277A8AA2%27 width=%27100%27 height=%27120%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 fontSize=%2710%27 fill=%27white%27 textAnchor=%27middle%27 dominantBaseline=%27middle%27%3EVTuber%3C/text%3E%3C/svg%3E")',
    genres: ["REINCARNATION", "Psychological", "Gender Bender"],
  },
];

export default popularNovels;
