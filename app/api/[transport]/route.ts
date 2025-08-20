// app/api/[transport]/route.ts
import { createMcpHandler } from "mcp-handler";
import { rollDice, rollDiceTool } from "@/lib/dice";
import { createDeck, shuffleDeck, drawCards } from "@/lib/deck";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    // Dice rolling tool
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

    // Deck shuffling tool
    server.tool(
      "shuffle_deck",
      "Shuffles one or more decks of 52 playing cards",
      {
        numDecks: z.number().min(1).max(8).default(1)
      },
      async ({ numDecks = 1 }) => {
        const deck = shuffleDeck(createDeck(numDecks));
        return {
          content: [{
            type: "text",
            text: `🎴 Shuffled ${numDecks} deck${numDecks > 1 ? 's' : ''} of cards! (${deck.length} cards total)`,
            metadata: { deck }
          }]
        };
      }
    );

    // Draw cards tool
    server.tool(
      "draw_cards",
      "Draws N cards from a given deck",
      {
        deck: z.array(z.object({
          suit: z.enum(['hearts', 'diamonds', 'clubs', 'spades']),
          rank: z.enum(['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'])
        })),
        count: z.number().min(1)
      },
      async ({ deck, count }) => {
        const { drawn, remaining } = drawCards(deck, count);
        const drawnText = drawn.map(card => `${card.rank} of ${card.suit}`).join(", ");
        return {
          content: [{
            type: "text",
            text: `🎴 Drew ${count} card(s): ${drawnText}. ${remaining.length} cards remaining.`,
            metadata: { drawn, remaining }
          }]
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