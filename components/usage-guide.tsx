import { Dice1, Spade } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function UsageGuide() {
  return (
    <div className="space-y-6">
      {/* Dice Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Dice1 className="h-5 w-5" />
            <span>How to Roll Dice with Claude</span>
          </CardTitle>
          <CardDescription>
            Once configured, you can ask Claude to roll dice in natural language.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Example Commands:</h4>
            <div className="grid gap-4">
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">Basic dice roll:</p>
                <p className="text-muted-foreground italic">&quot;Roll a 6-sided die&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🎲 You rolled a 4!</p>
              </Card>
              
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">D&amp;D style:</p>
                <p className="text-muted-foreground italic">&quot;Roll a d20 for me&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🎲 You rolled a 17!</p>
              </Card>
              
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">Custom dice:</p>
                <p className="text-muted-foreground italic">&quot;Can you roll a 100-sided die?&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🎲 You rolled a 73!</p>
              </Card>
              
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">In conversation:</p>
                <p className="text-muted-foreground italic">&quot;I need to make a decision. Roll a coin (2-sided die)&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🎲 You rolled a 1!</p>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Supported Dice Types:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[2, 4, 6, 8, 10, 12, 20, 100].map((sides) => (
                <Badge key={sides} variant="outline" className="justify-center py-2">
                  d{sides}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              + Any custom number of sides (minimum 2)
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Use Cases:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Tabletop Gaming:</strong> Roll dice for D&D, Pathfinder, or other RPGs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Decision Making:</strong> Use dice to make random choices</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Probability Teaching:</strong> Demonstrate random number generation</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Game Development:</strong> Test random mechanics and balance</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Card Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Spade className="h-5 w-5" />
            <span>How to Use Playing Cards with Claude</span>
          </CardTitle>
          <CardDescription>
            Draw cards, shuffle decks, and get card information using natural language.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Example Commands:</h4>
            <div className="grid gap-4">
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">Draw a single card:</p>
                <p className="text-muted-foreground italic">&quot;Draw a card from the deck&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🃏 You drew the K♠ (value: 13)</p>
              </Card>
              
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">Draw multiple cards:</p>
                <p className="text-muted-foreground italic">&quot;Deal me 5 cards&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🃏 You drew 5 cards: A♥, 7♦, Q♣, 3♠, 9♥</p>
              </Card>
              
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">Shuffle deck:</p>
                <p className="text-muted-foreground italic">&quot;Shuffle the deck&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🃏 Deck shuffled! 52 cards ready. Top card would be: 8♦</p>
              </Card>
              
              <Card className="p-4">
                <p className="font-medium text-sm mb-2">Get card information:</p>
                <p className="text-muted-foreground italic">&quot;Tell me about the card values&quot;</p>
                <Separator className="my-2" />
                <p className="text-sm">🃏 Standard 52-card deck: Suits: ♠♥♦♣, Ranks: A,2-10,J,Q,K. Values: A=1, 2-10=face value, J=11, Q=12, K=13</p>
              </Card>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Card Information:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-sm mb-2">Suits:</p>
                <div className="flex space-x-2">
                  <Badge variant="outline">♠ Spades</Badge>
                  <Badge variant="outline">♥ Hearts</Badge>
                  <Badge variant="outline">♦ Diamonds</Badge>
                  <Badge variant="outline">♣ Clubs</Badge>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm mb-2">Ranks:</p>
                <div className="flex flex-wrap gap-1">
                  {['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map((rank) => (
                    <Badge key={rank} variant="outline" className="text-xs">
                      {rank}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Use Cases:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Card Games:</strong> Play poker, blackjack, or other card games</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Magic Tricks:</strong> Use for card trick demonstrations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Random Selection:</strong> Pick random items from a list of 52</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Game Development:</strong> Test card game mechanics and probability</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span><strong>Education:</strong> Teach probability and statistics with cards</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
