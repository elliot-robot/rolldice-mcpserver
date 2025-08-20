import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <div className="text-center mb-12">
      <Badge variant="secondary" className="mb-4">
        ✨ MCP Server Ready
      </Badge>
      <h2 className="text-4xl font-bold mb-4">
        Add Dice & Cards to Claude Desktop
      </h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        A powerful Model Context Protocol server that lets you roll dice and draw playing cards directly within Claude Desktop conversations.
      </p>
    </div>
  )
}
