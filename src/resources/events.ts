import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { amplitudeService } from "../services/amplitude.service.js";
import { getAmplitudeCredentials } from "../utils/config.js";

/**
 * Resource template for accessing Amplitude event data
 * Format: amplitude://events/{eventType}/{start}/{end}
 */
export const eventsResourceTemplate = new ResourceTemplate(
  "amplitude://events/{eventType}/{start}/{end}",
  { list: undefined }
);

/**
 * Handler for events resource
 */
export const eventsResourceHandler = async (uri: URL, params: Record<string, string>) => {
  try {
    const { eventType, start, end } = params;
    
    if (!eventType || !start || !end) {
      return {
        contents: [
          {
            uri: uri.href,
            text: "Missing required parameters. Format: amplitude://events/{eventType}/{start}/{end}"
          }
        ]
      };
    }
    const credentials = getAmplitudeCredentials();
    
    // Query events
    const result = await amplitudeService.queryEvents(credentials, {
      events: [{ eventType }],
      start,
      end
    });
    
    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      contents: [
        {
          uri: uri.href,
          text: `Error accessing event data: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ]
    };
  }
};