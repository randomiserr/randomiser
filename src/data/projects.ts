export type Project = {
  id: string;
  title: string;
  oneliner: string;
  type: "now" | "past";
  tags: string[];
  details: string[];
  image: string;
  video?: string;
  link?: string;
};

export const projects: Project[] = [
  // NOW projects
  {
    id: "ai-coding-tools-aggregator",
    title: "AI coding tools aggregator",
    oneliner: "Run one prompt through multiple AI coding tools to get the best results",
    type: "now",
    tags: ["AI", "DevTools", "Aggregator", "Supabase", "Vercel", "CC"],
    details: [
      "Aggreagated multiple AI coding tools into one platform through APIs",
      "Interactive comparison overview of available tools",
      "Currently: v0 + Gemini"
    ],
    image: "/placeholders/ai-tools.svg",
    video: "/aggregator.mp4"
  },
  {
    id: "dino-arcade-game",
    title: "Dino arcade game",
    oneliner: "Multiplayer arcade game that combines Pacman with Donkey Kong",
    type: "now",
    tags: ["Game", "Lovable", "Supabase", "Vercel", "CC"],
    details: [
      "A multiplayer game that can be played on one or more computers",
      "Run around the map, gather food that gives special effects and points, and avoid ghosts",
      "Multiple levels, progressive difficulty, custom ghost logic, randomized obstacles",
      "Great for having fun with your closest ones",
    ],
    image: "/placeholders/dino-game.svg",
    video: "/dino_clip.mp4"
  },
  {
    id: "yc-cohort-examiner",
    title: "YC cohort examiner",
    oneliner: "Get information about the latest batches from YC",
    type: "now",
    tags: ["Scraping", "Data analysis"],
    details: [
      "Scraping Y Combinator startup data about their cohorts",
      "Tracking the latest changes and gathering insights about the companies",
      "Future: Tracking startup success metrics and exit patterns"
    ],
    image: "/placeholders/yc-analysis.svg",
    video: "/yc.mp4",
    link: "/yc-examiner"
  },
  
  // PAST projects
  {
    id: "brokkr",
    title: "Brokkr",
    oneliner: "Automated liquidity manager (ALM) that beat HODL and competitors",
    type: "past",
    tags: ["CEO", "Exited", "ALM", "V4 Hooks", "LP"],
    details: [
      "Took over the project after the Terra crash and led it to a merger with the founder of THORChain",
      "Developed algorithmic liquidity management strategies that significantly outperformed competitors solutions on the overall profitability and against HODL",
      "Formed partnerships with 5 large DEXs to integrate our V4 hooks that also received a grant from Uniswap Foundation",
      "Optimized delivery processes to ship faster even while downsizing 19 → 7 people",
      "Speaker at ETHZurich and Consensus where I represented the product vision"
    ],
    image: "/brokkr.png",
    link: "https://x.com/BrokkrFinance"
  },
  {
    id: "crypto-9gag",
    title: "Crypto 9GAG",
    oneliner: "Crypto memes combined with tokens",
    type: "past",
    tags: ["Web3", "Social", "Memes", "Wireframe"],
    details: [
      "A functional wireframe MVP that combined 9gag with trading",
      "It would let users create memes specifically for a token and make it tradeable",
      "The purpose was make the communities form around memes. Because what is crypto without memes?",
      "Unfortunately the partner backed off the project",
      "I came up with that before Zora became a thing"
    ],
    image: "/crypto_9gag.png"
  },
  {
    id: "crypto-loyalty-program",
    title: "Crypto Loyalty Program",
    oneliner: "On-chain loyalty program that brought results",
    type: "past",
    tags: ["Community", "Loyalty", "Web3"],
    details: [
      "A unique loyalty program that rewarded users, content creation, and social activity",
      "Tracked: Activity on socials (X & Discord), Deposits, Content creation",
      "Members received points to a seasonal leaderboard",
      "Essentially a combination of regular points and Kaito - but before it was cool",
      "It drove over 2,500 users in the first season and generated over 1m impressions with 12k followers"
    ],
    image: "/comm_rewards.webp"
  }
];

export const blogPosts = [
  {
    id: "building-at-the-speed-of-thought",
    title: "Building at the Speed of Thought",
    excerpt: "How I prototype ideas in under 24 hours and why most fail beautifully.",
    date: "2024-03-15",
    tags: ["Process", "Rapid Prototyping"]
  },
  {
    id: "randomness-as-design-principle",
    title: "Randomness as a Design Principle",
    excerpt: "Why controlled chaos creates more engaging user experiences than perfect grids.",
    date: "2024-02-28",
    tags: ["Design", "UX", "Philosophy"]
  },
  {
    id: "the-art-of-digital-serendipity",
    title: "The Art of Digital Serendipity",
    excerpt: "Designing systems that surprise users in delightful ways without breaking their mental models.",
    date: "2024-02-10",
    tags: ["Product", "Psychology", "Design"]
  }
];