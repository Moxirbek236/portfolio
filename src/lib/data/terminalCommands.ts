import { PORTFOLIO_DATA } from "./portfolioData";

export interface TerminalOutput {
  type: "text" | "json" | "error" | "success" | "list";
  content: string | string[] | object;
}

export function handleTerminalCommand(input: string): TerminalOutput {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case "help":
      return {
        type: "list",
        content: [
          "Available Commands:",
          "  bio         - Print Moxirbek's engineering background & story",
          "  products    - List all production products built",
          "  educoin     - Print technical details for Educoin multi-tenant LMS",
          "  ross        - Print WebRTC VoIP architecture details for Ross Messenger",
          "  mk          - Print MK Academy PWA details",
          "  bot         - Print Instagram Media Delivery Bot specifications",
          "  skills      - Show categorized tech stack & system capabilities",
          "  contact     - Display direct contact channels (Email, Telegram, Phone)",
          "  cv          - Download Moxirbek Solijonov's CV document",
          "  clear       - Clear terminal screen history",
        ]
      };

    case "bio":
    case "about":
      return {
        type: "text",
        content: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.role}\nLocation: ${PORTFOLIO_DATA.personal.location}\n\n${PORTFOLIO_DATA.personal.headline}\n\nStory:\n${PORTFOLIO_DATA.personal.storyBio}`
      };

    case "products":
      return {
        type: "list",
        content: [
          "Products Built:",
          ...PORTFOLIO_DATA.products.map(p => `  • ${p.title}: ${p.subtitle} (${p.period})`)
        ]
      };

    case "educoin":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find(p => p.id === "educoin") || {}
      };

    case "ross":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find(p => p.id === "ross-messenger") || {}
      };

    case "mk":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find(p => p.id === "mk-academy") || {}
      };

    case "bot":
      return {
        type: "json",
        content: PORTFOLIO_DATA.products.find(p => p.id === "instagram-bot") || {}
      };

    case "skills":
      return {
        type: "json",
        content: PORTFOLIO_DATA.skillCapabilities
      };

    case "contact":
      return {
        type: "list",
        content: [
          "Direct Contact Channels:",
          `  Email:    ${PORTFOLIO_DATA.personal.email}`,
          `  Telegram: ${PORTFOLIO_DATA.personal.telegramHandle} (${PORTFOLIO_DATA.personal.telegram})`,
          `  Phone:    ${PORTFOLIO_DATA.personal.phone}`,
          `  Location: ${PORTFOLIO_DATA.personal.location}`,
          `  LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}`,
          `  GitHub:   ${PORTFOLIO_DATA.personal.github}`
        ]
      };

    case "cv":
      return {
        type: "success",
        content: "Initiating CV download..."
      };

    case "":
      return { type: "text", content: "" };

    default:
      return {
        type: "error",
        content: `Command not recognized: '${cmd}'. Type 'help' to see list of valid commands.`
      };
  }
}
