#!/usr/bin/env node

// This is the CLI entry point for the amplitude-mcp package
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { argv } from "process";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments for verbose flag
// Default to true (verbose), only suppress when explicitly set to false
const isVerbose = !argv.includes("--verbose=false");

// Import the server from the main index.js file
const serverPath = resolve(__dirname, "../dist/index.js");

// Dynamic import to load the server module
async function runServer() {
  try {
    // Dynamically import the server module
    const serverModule = await import(serverPath);

    // The server should already be created and exported from index.js
    // The connection to StdioServerTransport is already handled in index.js

    // Only show these messages if verbose mode is enabled
    if (isVerbose) {
      console.log("Amplitude MCP server started");
      console.log("Use Ctrl+C to stop the server");
    }
  } catch (error) {
    console.error("Failed to start Amplitude MCP server:", error);
    process.exit(1);
  }
}

// Run the server
runServer();
