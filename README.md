# Amplitude MCP Server

A Model Context Protocol (MCP) server for Amplitude Analytics API, providing tools and resources for querying and segmenting event data.

## Overview

This MCP server enables AI assistants and other MCP clients to interact with the Amplitude Analytics API, allowing them to:

- Query event data with filters
- Perform advanced segmentation with breakdowns
- Access event data through structured resources

## Installation

```json
{
  "mcpServers": {
    "amplitude": {
      "command": "npx",
      "args": [
        "-y",
        "amplitude-mcp",
        "--amplitude-api-key=YOUR_API_KEY",
        "--amplitude-secret-key=YOUR_SECRET_KEY"
      ]
    }
  }
}
```

### Required Credentials

Amplitude API credentials must be provided using command line arguments:

- `--amplitude-api-key`: Your Amplitude API key (required)
- `--amplitude-secret-key`: Your Amplitude secret key (required)

## Available Tools

### 1. query_events

Basic event querying with filters.

**Parameters:**

- `events` (array): Array of events to query
  - `eventType` (string): Type of event
  - `propertyFilters` (array, optional): Filters for event properties
- `start` (string): Start date in YYYYMMDD format
- `end` (string): End date in YYYYMMDD format
- `interval` (string, optional): Grouping interval (day, week, month)
- `groupBy` (string, optional): Grouping dimension

**Example:**

```json
{
  "events": [
    {
      "eventType": "user_login",
      "propertyFilters": [
        {
          "propertyName": "device_type",
          "value": "mobile",
          "op": "is"
        }
      ]
    }
  ],
  "start": "2023-01-01",
  "end": "2023-01-31",
  "interval": "day"
}
```

### 2. segment_events

Advanced event segmentation with breakdowns.

**Parameters:**

- All parameters from `query_events`
- `filters` (array, optional): Additional filters for segmentation
  - `type` (string): Filter type (property, event, user)
  - `propertyName` (string, optional): Name of the property
  - `value` (mixed, optional): Value to filter by
  - `op` (string, optional): Operator for comparison
- `breakdowns` (array, optional): Breakdown dimensions
  - `type` (string): Breakdown type (event, user)
  - `propertyName` (string): Name of the property to break down by

**Example:**

```json
{
  "events": [
    {
      "eventType": "purchase"
    }
  ],
  "start": "2023-01-01",
  "end": "2023-01-31",
  "interval": "week",
  "filters": [
    {
      "type": "user",
      "propertyName": "country",
      "value": "US",
      "op": "is"
    }
  ],
  "breakdowns": [
    {
      "type": "user",
      "propertyName": "device_type"
    }
  ]
}
```

## Available Resources

### amplitude_events

Access event data for a specific event type and date range.

**URI Format:**
```
amplitude://events/{eventType}/{start}/{end}
```

**Example:**
```
amplitude://events/user_login/2023-01-01/2023-01-31
```

## Development

### Project Structure

```
amplitude-mcp/
├── src/
│   ├── index.ts                  # Main entry point with MCP server setup
│   ├── services/
│   │   └── amplitude.service.ts  # Amplitude API service implementation
│   ├── resources/
│   │   └── events.ts             # Event data resources
│   ├── types/
│   │   └── amplitude.ts          # Amplitude API types
│   └── utils/
│       └── config.ts             # Configuration and credential handling
├── bin/
│   └── cli.js                    # CLI entry point
├── dist/                         # Compiled JavaScript files
├── package.json
└── tsconfig.json
```

## License

MIT