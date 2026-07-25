import { PORTFOLIO_DATA } from "./portfolioData";

export interface TerminalOutput {
  type: "text" | "json" | "error" | "success" | "list";
  content: string | string[] | object;
}

export function handleTerminalCommand(input: string): TerminalOutput {
  const rawInput = input.trim();
  const tokens = rawInput.split(/\s+/);
  const cmd = (tokens[0] || "").toLowerCase();
  const arg = (tokens[1] || "").toLowerCase();

  switch (cmd) {
    case "help":
    case "?":
      return {
        type: "list",
        content: [
          "============================================================",
          " MOXIRBEK SOLIJONOV DEVELOPER CLI TERMINAL (v1.5.0)",
          "============================================================",
          " Core Commands:",
          "   bio / about    - Display full background & engineering narrative",
          "   products / ls  - List all production software products built",
          "   educoin        - Inspect Educoin Multi-Tenant LMS architecture & code",
          "   ross           - Inspect Ross Messenger WebRTC UDP proxy specs",
          "   mk             - Inspect MK Academy PWA spaced repetition engine",
          "   bot            - Inspect Instagram Media Delivery Bot queue specs",
          "   skills / stack - Print technology capabilities & depth scores",
          "   experience     - Show Najot Ta'lim CS teaching role & education",
          "   contact        - Display email, telegram, phone & socials",
          "   cv / resume    - Download Moxirbek-Solijonov-CV.pdf",
          "   whoami         - Print current shell user info",
          "   uname          - Print system info",
          "   clear          - Clear terminal history screen",
          "============================================================"
        ]
      };

    case "bio":
    case "about":
      return {
        type: "text",
        content: `Name: ${PORTFOLIO_DATA.personal.name}\nRole: ${PORTFOLIO_DATA.personal.role}\nLocation: ${PORTFOLIO_DATA.personal.location}\nAvailability: ${PORTFOLIO_DATA.personal.availability}\n\nHeadline:\n"${PORTFOLIO_DATA.personal.headline}"\n\nStory:\n${PORTFOLIO_DATA.personal.storyBio}`
      };

    case "products":
    case "work":
    case "ls":
      return {
        type: "list",
        content: [
          "Production Products:",
          ...PORTFOLIO_DATA.products.map(
            (p) => `  • ${p.title.padEnd(20)} [${p.subtitle}] (${p.period})`
          )
        ]
      };

    case "educoin":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find((p) => p.id === "educoin") || {}
      };

    case "ross":
    case "ross-messenger":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find((p) => p.id === "ross-messenger") || {}
      };

    case "mk":
    case "mk-academy":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find((p) => p.id === "mk-academy") || {}
      };

    case "bot":
    case "instagram-bot":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find((p) => p.id === "instagram-bot") || {}
      };

    case "skills":
    case "stack":
      return {
        type: "json",
        content: PORTFOLIO_DATA.skillCapabilities
      };

    case "experience":
      return {
        type: "json",
        content: {
          experience: PORTFOLIO_DATA.experience,
          education: PORTFOLIO_DATA.education
        }
      };

    case "contact":
      return {
        type: "list",
        content: [
          "Direct Connection Channels:",
          `  Email:    ${PORTFOLIO_DATA.personal.email}`,
          `  Telegram: ${PORTFOLIO_DATA.personal.telegramHandle} (${PORTFOLIO_DATA.personal.telegram})`,
          `  Phone:    ${PORTFOLIO_DATA.personal.phone}`,
          `  Location: ${PORTFOLIO_DATA.personal.location}`,
          `  LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}`,
          `  GitHub:   ${PORTFOLIO_DATA.personal.github}`
        ]
      };

    case "cv":
    case "resume":
      return {
        type: "success",
        content: "Initiating PDF CV download: Moxirbek-Solijonov-CV.pdf"
      };

    case "whoami":
      return {
        type: "text",
        content: "guest@recruiter-node (Permission: READ / INSPECT / HIRE)"
      };

    case "uname":
    case "uname -a":
      return {
        type: "text",
        content: "MoxirbekOS 2026.07.26 x86_64 Next.js/Turbopack TypeScript System"
      };

    case "pwd":
      return {
        type: "text",
        content: "/home/moxirbek/portfolio"
      };

    case "date":
      return {
        type: "text",
        content: new Date().toString()
      };

    case "sudo":
      return {
        type: "error",
        content: "Permission denied: Recruiter guest account has read-only access. Try 'hire' or 'contact'."
      };

    case "echo":
      return {
        type: "text",
        content: tokens.slice(1).join(" ") || ""
      };

    case "cat":
      if (arg === "profile.json" || arg === "bio.txt") {
        return {
          type: "json",
          content: PORTFOLIO_DATA.personal
        };
      }
      return {
        type: "text",
        content: "Usage: cat profile.json | cat bio.txt"
      };

    case "":
      return { type: "text", content: "" };

    default:
      return {
        type: "error",
        content: `Command not recognized: '${rawInput}'. Type 'help' to see list of valid commands.`
      };
  }
}
