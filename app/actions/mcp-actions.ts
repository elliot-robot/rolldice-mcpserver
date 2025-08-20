'use server'

import { rollDice as rollDiceCore, rollDiceTool } from "@/lib/dice"
import { createDeck, shuffleDeck, drawCards, Card } from "@/lib/deck"
import { z } from "zod"

// Server action that uses the shared dice rolling logic
export async function rollDice(sides: number) {
  try {
    const result = rollDiceCore(sides)
    
    return {
      success: true,
      result: {
        content: [result]
      }
    }
  } catch {
    return {
      success: false,
      error: {
        code: -32602,
        message: 'Invalid parameters: sides must be a number >= 2'
      }
    }
  }
}

// Server action for shuffling a deck
export async function shuffleDeckAction() {
  try {
    const deck = shuffleDeck(createDeck())
    return {
      success: true,
      result: {
        content: [deck]
      }
    }
  } catch {
    return {
      success: false,
      error: {
        code: -32602,
        message: 'Failed to shuffle deck'
      }
    }
  }
}

// Server action for drawing cards from a deck
export async function drawCardsAction(deck: Card[], count: number) {
  try {
    if (!Array.isArray(deck) || typeof count !== 'number' || count < 1) {
      throw new Error('Invalid parameters')
    }
    const { drawn, remaining } = drawCards(deck, count)
    return {
      success: true,
      result: {
        content: [{ drawn, remaining }]
      }
    }
  } catch {
    return {
      success: false,
      error: {
        code: -32602,
        message: 'Invalid parameters: must provide a deck and count >= 1'
      }
    }
  }
}

export async function listTools() {
  return {
    success: true,
    result: {
      tools: [
        {
          name: rollDiceTool.name,
          description: rollDiceTool.description,
          inputSchema: {
            type: 'object',
            properties: {
              sides: {
                type: 'number',
                description: 'Number of sides on the die (minimum 2)',
                minimum: 2
              }
            },
            required: ['sides']
          }
        },
        {
          name: 'shuffle_deck',
          description: 'Shuffles a standard deck of 52 playing cards',
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        },
        {
          name: 'draw_cards',
          description: 'Draws N cards from a given deck',
          inputSchema: {
            type: 'object',
            properties: {
              deck: {
                type: 'array',
                description: 'The deck to draw from (array of cards)',
                items: {
                  type: 'object',
                  properties: {
                    suit: { type: 'string' },
                    rank: { type: 'string' }
                  },
                  required: ['suit', 'rank']
                }
              },
              count: {
                type: 'number',
                description: 'Number of cards to draw',
                minimum: 1
              }
            },
            required: ['deck', 'count']
          }
        }
      ]
    }
  }
}
