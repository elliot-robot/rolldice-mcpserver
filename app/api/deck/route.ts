// app/api/deck/route.ts
import { NextRequest } from 'next/server'
import { createDeck, shuffleDeck, drawCards, Card } from '@/lib/deck'

export async function POST(req: NextRequest) {
  try {
    const { action, deck, count, numDecks = 1 } = await req.json()

    if (action === 'shuffle') {
      const shuffled = shuffleDeck(createDeck(numDecks))
      return Response.json({ success: true, deck: shuffled })
    }

    if (action === 'draw') {
      if (!Array.isArray(deck) || typeof count !== 'number' || count < 1) {
        return Response.json({ success: false, error: 'Invalid parameters' }, { status: 400 })
      }
      const { drawn, remaining } = drawCards(deck, count)
      return Response.json({ success: true, drawn, remaining })
    }

    return Response.json({ success: false, error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    return Response.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}