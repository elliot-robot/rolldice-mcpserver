import { z } from "zod"

// Card types and constants
export const SUITS = ['♠', '♥', '♦', '♣'] as const
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const

export type Suit = typeof SUITS[number]
export type Rank = typeof RANKS[number]

export interface Card {
  rank: Rank
  suit: Suit
  value: number // Ace = 1, Face cards = 11, 12, 13
}

// Zod schemas for validation
export const drawCountSchema = z.number().int().min(1).max(52)

// Create a standard 52-card deck
export function createDeck(): Card[] {
  const deck: Card[] = []
  
  for (const suit of SUITS) {
    for (let i = 0; i < RANKS.length; i++) {
      const rank = RANKS[i]
      let value: number
      
      if (rank === 'A') {
        value = 1
      } else if (['J', 'Q', 'K'].includes(rank)) {
        value = 11 + ['J', 'Q', 'K'].indexOf(rank)
      } else {
        value = parseInt(rank)
      }
      
      deck.push({ rank, suit, value })
    }
  }
  
  return deck
}

// Shuffle a deck using Fisher-Yates algorithm
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Draw a single card from a shuffled deck
export function drawCard() {
  const deck = shuffleDeck(createDeck())
  const card = deck[0]
  
  return {
    type: 'text' as const,
    text: `🃏 You drew the ${card.rank}${card.suit} (value: ${card.value})`
  }
}

// Draw multiple cards from a shuffled deck
export function drawCards(count: number) {
  // Validate input using the shared schema
  const validatedCount = drawCountSchema.parse(count)
  
  const deck = shuffleDeck(createDeck())
  const drawnCards = deck.slice(0, validatedCount)
  
  const cardStrings = drawnCards.map(card => `${card.rank}${card.suit}`)
  const cardText = cardStrings.join(', ')
  
  return {
    type: 'text' as const,
    text: `🃏 You drew ${validatedCount} card${validatedCount > 1 ? 's' : ''}: ${cardText}`
  }
}

// Get information about a shuffled deck
export function shuffleDeckInfo() {
  const deck = shuffleDeck(createDeck())
  const topCard = deck[0]
  
  return {
    type: 'text' as const,
    text: `🃏 Deck shuffled! 52 cards ready. Top card would be: ${topCard.rank}${topCard.suit}`
  }
}

// Get information about card values and rules
export function getCardInfo() {
  return {
    type: 'text' as const,
    text: `🃏 Standard 52-card deck: Suits: ♠♥♦♣, Ranks: A,2-10,J,Q,K. Values: A=1, 2-10=face value, J=11, Q=12, K=13`
  }
}

// Tool definitions that can be reused
export const drawCardTool = {
  name: 'draw_card',
  description: 'Draw a single random card from a shuffled deck',
  schema: {}
} as const

export const drawCardsTool = {
  name: 'draw_cards', 
  description: 'Draw multiple cards from a shuffled deck',
  schema: {
    count: drawCountSchema,
  }
} as const

export const shuffleDeckTool = {
  name: 'shuffle_deck',
  description: 'Shuffle a deck and show the top card',
  schema: {}
} as const

export const cardInfoTool = {
  name: 'card_info',
  description: 'Get information about card values and deck composition',
  schema: {}
} as const