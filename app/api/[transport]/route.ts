// app/api/[transport]/route.ts
import { createMcpHandler } from "mcp-handler";
import { rollDice, rollDiceTool } from "@/lib/dice";
import { 
  drawCard, 
  drawCards, 
  shuffleDeckInfo, 
  getCardInfo,
  drawCardTool,
  drawCardsTool, 
  shuffleDeckTool,
  cardInfoTool 
} from "@/lib/cards";

const handler = createMcpHandler(
  (server) => {
    // Dice tools
    server.tool(
      rollDiceTool.name,
      rollDiceTool.description,
      rollDiceTool.schema,
      async ({ sides }) => {
        // Use the shared dice rolling logic
        const result = rollDice(sides);
        return {
          content: [result],
        };
      }
    );

    // Card tools
    server.tool(
      drawCardTool.name,
      drawCardTool.description,
      drawCardTool.schema,
      async () => {
        // Use the shared card drawing logic
        const result = drawCard();
        return {
          content: [result],
        };
      }
    );

    server.tool(
      drawCardsTool.name,
      drawCardsTool.description,
      drawCardsTool.schema,
      async ({ count }) => {
        // Use the shared card drawing logic
        const result = drawCards(count);
        return {
          content: [result],
        };
      }
    );

    server.tool(
      shuffleDeckTool.name,
      shuffleDeckTool.description,
      shuffleDeckTool.schema,
      async () => {
        // Use the shared deck shuffling logic
        const result = shuffleDeckInfo();
        return {
          content: [result],
        };
      }
    );

    server.tool(
      cardInfoTool.name,
      cardInfoTool.description,
      cardInfoTool.schema,
      async () => {
        // Use the shared card info logic
        const result = getCardInfo();
        return {
          content: [result],
        };
      }
    );
  },
  {
    // Optional server options
  },
  {
    // No Redis config - disable Redis requirement
    basePath: "/api", // this needs to match where the [transport] is located.
    maxDuration: 60,
    verboseLogs: true,
  }
);
export { handler as GET, handler as POST };