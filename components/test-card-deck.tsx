"use client"

import { useState, useEffect } from "react"
import { Spade, RefreshCw, CheckCircle, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { drawCard as drawCardAction, drawCards as drawCardsAction, shuffleDeck as shuffleDeckAction, getCardInfo as getCardInfoAction, listTools } from "@/app/actions/mcp-actions"

type ServerStatus = 'checking' | 'online' | 'offline'

export function TestCardDeck() {
  const [count, setCount] = useState(1)
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState<ServerStatus>('checking')

  // Check server status on mount
  useEffect(() => {
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    setServerStatus('checking')
    try {
      const result = await listTools()
      if (result.success && result.result.tools.some(tool => tool.name.includes('card'))) {
        setServerStatus('online')
      } else {
        setServerStatus('offline')
      }
    } catch {
      setServerStatus('offline')
    }
  }

  const drawSingleCard = async () => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      // Use server action to call MCP card drawing logic
      const result = await drawCardAction()
      
      if (result.success && result.result) {
        setResult(result.result.content[0].text)
      } else if (result.error) {
        setError(result.error.message || 'An error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const drawMultipleCards = async () => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      // Use server action to call MCP card drawing logic
      const result = await drawCardsAction(count)
      
      if (result.success && result.result) {
        setResult(result.result.content[0].text)
      } else if (result.error) {
        setError(result.error.message || 'An error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const shuffleDeck = async () => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      // Use server action to call MCP deck shuffling logic
      const result = await shuffleDeckAction()
      
      if (result.success && result.result) {
        setResult(result.result.content[0].text)
      } else if (result.error) {
        setError(result.error.message || 'An error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const showCardInfo = async () => {
    setLoading(true)
    setError('')
    setResult('')

    try {
      // Use server action to call MCP card info logic
      const result = await getCardInfoAction()
      
      if (result.success && result.result) {
        setResult(result.result.content[0].text)
      } else if (result.error) {
        setError(result.error.message || 'An error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Spade className="h-5 w-5" />
            <span>MCP Card Deck Interface</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm">
              {serverStatus === 'checking' && (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground">Checking...</span>
                </>
              )}
              {serverStatus === 'online' && (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">Server Online</span>
                </>
              )}
              {serverStatus === 'offline' && (
                <>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">Server Offline</span>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={checkServerStatus}
              disabled={serverStatus === 'checking'}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Test the card deck tools using the same logic as the MCP server. Draw cards, shuffle deck, or get card information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Results Display */}
        <div className="space-y-4">
          {result && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-700 dark:text-green-300 font-mono text-sm">{result}</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Single Card Drawing */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Draw Single Card</h4>
            <Button
              onClick={drawSingleCard}
              disabled={loading || serverStatus !== 'online'}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Drawing...
                </>
              ) : (
                <>
                  <Spade className="mr-2 h-4 w-4" />
                  Draw Card
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Multiple Cards Drawing */}
          <div>
            <h4 className="font-semibold mb-2">Draw Multiple Cards</h4>
            <div className="flex items-center space-x-2 mb-3">
              <label htmlFor="count" className="text-sm font-medium">
                Count:
              </label>
              <Input
                id="count"
                type="number"
                min="1"
                max="52"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-20"
              />
              <div className="flex space-x-1">
                {[1, 3, 5, 10].map((presetCount) => (
                  <Button
                    key={presetCount}
                    variant={count === presetCount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCount(presetCount)}
                  >
                    {presetCount}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={drawMultipleCards}
              disabled={loading || serverStatus !== 'online' || count < 1 || count > 52}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Drawing...
                </>
              ) : (
                <>
                  <Spade className="mr-2 h-4 w-4" />
                  Draw {count} Card{count > 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div>
            <h4 className="font-semibold mb-2">Quick Actions</h4>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={shuffleDeck}
                disabled={loading || serverStatus !== 'online'}
              >
                Shuffle Deck
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={showCardInfo}
                disabled={loading || serverStatus !== 'online'}
              >
                <Info className="mr-1 h-3 w-3" />
                Card Info
              </Button>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>This interface uses server actions that call the same card logic as the MCP server.</p>
          <p>The MCP server endpoint is at /api/[transport] for Claude Desktop connections.</p>
        </div>
      </CardContent>
    </Card>
  )
}