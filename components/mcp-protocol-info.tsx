import { Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function McpProtocolInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>About MCP Protocol & Server Actions</span>
        </CardTitle>
        <CardDescription>
          Understanding how the Model Context Protocol works and how this web interface connects to it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is MCP (Model Context Protocol)?</h4>
            <p className="text-sm text-muted-foreground">
              MCP is a protocol that allows AI assistants like Claude to securely connect to external tools and data sources. 
              It defines a standardized way for AI models to discover available tools, understand their capabilities, and execute them safely.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-sm mb-2">How the MCP Server Works</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Transport Layer:</strong> The server at <code className="bg-muted px-1 rounded">/api/[transport]</code> handles different connection types (SSE, stdio, etc.)</p>
              <p>• <strong>Tool Registration:</strong> Tools like <code className="bg-muted px-1 rounded">roll_dice</code>, <code className="bg-muted px-1 rounded">draw_card</code>, and <code className="bg-muted px-1 rounded">draw_cards</code> are registered with schemas defining their inputs</p>
              <p>• <strong>JSON-RPC Protocol:</strong> All communication uses JSON-RPC 2.0 for method calls and responses</p>
              <p>• <strong>Type Safety:</strong> Uses Zod schemas for runtime validation of tool parameters</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-sm mb-2">Web Interface Bridge</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                This web interface uses <strong>Next.js Server Actions</strong> that call shared game logic. 
                Both the MCP server and web interface use the exact same functions from <code className="bg-muted px-1 rounded">/lib/dice.ts</code> and <code className="bg-muted px-1 rounded">/lib/cards.ts</code>.
              </p>
              <p className="mt-2">
                <strong>Benefits:</strong> Identical validation, randomness algorithms, output formats, and tool definitions - true single source of truth.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              <strong>💡 Technical Note:</strong> The MCP handler at <code className="bg-muted px-1 rounded">/api/[transport]</code> and server actions both import the same 
              game logic from <code className="bg-muted px-1 rounded">lib/dice.ts</code> and <code className="bg-muted px-1 rounded">lib/cards.ts</code>, ensuring absolute consistency between Claude Desktop and web testing.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
