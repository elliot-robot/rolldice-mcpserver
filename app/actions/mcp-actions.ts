'use server'

import { rollDice as rollDiceCore, rollDiceTool } from "@/lib/dice"
import { 
  drawCard as drawCardCore,
  drawCards as drawCardsCore,
  shuffleDeckInfo as shuffleDeckInfoCore,
  getCardInfo as getCardInfoCore,
  drawCardTool,
  drawCardsTool,
  shuffleDeckTool,
  cardInfoTool
} from "@/lib/cards"

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

// Server actions for card functionality
export async function drawCard() {
  try {
    const result = drawCardCore()
    
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
        message: 'Failed to draw card'
      }
    }
  }
}

export async function drawCards(count: number) {
  try {
    const result = drawCardsCore(count)
    
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
        message: 'Invalid parameters: count must be a number between 1 and 52'
      }
    }
  }
}

export async function shuffleDeck() {
  try {
    const result = shuffleDeckInfoCore()
    
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
        message: 'Failed to shuffle deck'
      }
    }
  }
}

export async function getCardInfo() {
  try {
    const result = getCardInfoCore()
    
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
        message: 'Failed to get card info'
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
          name: drawCardTool.name,
          description: drawCardTool.description,
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        },
        {
          name: drawCardsTool.name,
          description: drawCardsTool.description,
          inputSchema: {
            type: 'object',
            properties: {
              count: {
                type: 'number',
                description: 'Number of cards to draw (1-52)',
                minimum: 1,
                maximum: 52
              }
            },
            required: ['count']
          }
        },
        {
          name: shuffleDeckTool.name,
          description: shuffleDeckTool.description,
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        },
        {
          name: cardInfoTool.name,
          description: cardInfoTool.description,
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        }
      ]
    }
  }
}
