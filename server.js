import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "hospitaliti-jobs-knowledge-base", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// List tools available to the LLM
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_jobs_knowledge_base",
      description: "Searches job-related content from the Hospitaliti Jobs API",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string" }
        },
        required: ["query"]
      }
    }
  ]
}));

// Define how the tool runs
server.setRequestHandler(CallToolRequestSchema, async (req) => {

  if (req.params.name === "search_jobs_knowledge_base") {

    const query = req.params.arguments.query;
    const apiUrl = process.env.API_URL;

    try {
      const response = await fetch(`${apiUrl}/api/mcp/jobs/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: error.message }, null, 2)
        }],
        isError: true
      };
    }
  }

  throw new Error(`Unknown tool: ${req.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
