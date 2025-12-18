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

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content?: BlogContent;
};

export type BlogContent = {
  introduction: string;
  sections: BlogSection[];
  conclusion?: string;
};

export type BlogSection = {
  title: string;
  content: string;
  subsections?: BlogSubsection[];
  image?: string;
  imageAlt?: string;
  codeBlock?: string;
  callout?: {
    type: "info" | "warning" | "success";
    content: string;
  };
};

export type BlogSubsection = {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  codeBlock?: string;
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
    id: "descart",
    title: "Descart",
    oneliner: "A deep LLM analyzer that researches political topics and provides a thorough analysis of the impact on the state",
    type: "now",
    tags: ["Political", "RAG", "Exa", "Tavily", "Gemini"],
    details: [
      "Using RAG for static data and laws",
      "Combining multiple search tools to get the best sources",
      "Strong models on the analysis and judgement"
    ],
    image: "/placeholders/descart.svg",
    video: "/descart.mp4",
    link: "https://descart.vercel.app/"
  },
  {
    id: "chartz",
    title: "Chartz",
    oneliner: "A Geoguessr like game, but for traders. Players get random charts and random timeframes and guess where the price goes next",
    type: "now",
    tags: ["Game", "Trading", "Prediction game"],
    details: [
      "10 year of data",
      "Duel, campaign, and strike modes",
      "Customized TradingView charts"
    ],
    image: "/placeholders/chartz.svg",
    video: "/chartz.mp4",
    link: "https://www.chartz.xyz/"
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

export const blogPosts: BlogPost[] = [
  {
    id: "connect-hostinger-domain-to-vercel",
    title: "Hostinger → Vercel: connect your domain in minutes",
    excerpt: "Step-by-step guide to connect a Hostinger-registered domain to a Vercel project. Includes DNS records, www redirect, verification, and troubleshooting.",
    date: "2025-09-15",
    tags: [],
    content: {
      introduction: "Exact steps and DNS records to connect a Hostinger-registered domain to a Vercel project. Works for the apex (randomiser.xyz) and the www subdomain. Copy-paste friendly.",
      sections: [
        {
          title: "Before you start",
          content: "Make sure you have:\n• A **Vercel project** deployed (Production)\n• Your domain is **managed at Hostinger** (DNS Zone Editor access)\n• You can keep this tab open on Vercel's *Domains* page"
        },
        {
          title: "1) Add your domain in Vercel",
          content: "1. Open your project in Vercel → **Settings → Domains**\n2. Click **Add** and enter your apex domain (e.g. `randomiser.xyz`)\n3. Attach it to the **Production** environment\n\nVercel will now show the DNS records you need. Keep that page open.",
          image: "/blog/vercel-add-domain.png",
          imageAlt: "Vercel Add Domain dialog showing how to add a domain to a project"
        },
        {
          title: "2) Create DNS records in Hostinger",
          content: "In Hostinger, go to **hPanel → Domains → DNS Zone Editor** for your domain, then add these records:",
          image: "/blog/hostinger-dns-settings.png",
          imageAlt: "Hostinger DNS settings navigation showing where to find DNS Zone Editor",
          subsections: [
            {
              title: "Apex domain (randomiser.xyz)",
              content: "Add an A record with these values:",
              codeBlock: `Type: A
Name/Host: @
Value: 76.76.21.21
TTL: 300–3600`
            },
            {
              title: "www subdomain (www.randomiser.xyz)",
              content: "Add a CNAME record with these values:",
              codeBlock: `Type: CNAME
Name/Host: www
Value: cname.vercel-dns.com
TTL: 300–3600`,
              image: "/blog/hostinger-domain-add.png",
              imageAlt: "Hostinger DNS record creation interface showing how to add DNS records"
            }
          ],
          callout: {
            type: "info",
            content: "**Why:** Vercel routes apex domains via a single A record to `76.76.21.21`.\n\n**Alternative:** If Vercel shows a project-specific CNAME (like `randomiser-xyz.vercel.app` or `xyz.vercel-dns.com`), use exactly what Vercel displays.\n\n**Important:** Delete any old/conflicting records:\n• Other **A** records for `@`\n• **AAAA** records (IPv6) for `@` or `www`\n• Any CNAME for `@` (apex can't be a CNAME)"
          }
        },
        {
          title: "3) Verify and make it live",
          content: "1. Back in Vercel → **Settings → Domains**, click **Refresh** or **Verify**\n2. Vercel should show a green check for both `randomiser.xyz` and `www.randomiser.xyz`\n3. Enable **Redirect www → apex** in Vercel if you want `www` to redirect to `randomiser.xyz`",
          image: "/blog/vercel-verified-domains.png",
          imageAlt: "Vercel domains page showing successfully verified domains with green checkmarks",
          callout: {
            type: "success",
            content: "**SSL:** Vercel issues certificates automatically once DNS is correct."
          }
        },
        {
          title: "4) Troubleshooting",
          content: "Common issues and solutions:\n• **Still pending?** DNS can take time (usually 5–30 min, up to a few hours). Check with `dig` or an online DNS checker\n• **Multiple A records?** Keep only `76.76.21.21` for `@`\n• **IPv6 causing conflicts?** Remove AAAA for `@`/`www` unless you've configured it for Vercel specifically\n• **Using Cloudflare?** Temporarily set the record to \"DNS only\" (grey cloud) until verification succeeds"
        }
      ],
      conclusion: "That's it! Your Hostinger domain should now be connected to your Vercel project with automatic SSL certificates. The process typically takes 5-30 minutes for DNS propagation."
    }
  }
];