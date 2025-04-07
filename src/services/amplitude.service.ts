import fetch from 'node-fetch';
import {
  AmplitudeCredentials,
  EventSegmentationParams,
  EventSegmentationResponse,
  AmplitudeErrorResponse
} from '../types/amplitude.js';

export class AmplitudeService {
  private readonly baseUrl = 'https://amplitude.com/api/2';
  
  /**
   * Query events using the Event Segmentation API
   * @param credentials Amplitude API credentials
   * @param params Event segmentation parameters
   * @returns Event segmentation data
   */
  async queryEvents(
    credentials: AmplitudeCredentials,
    params: EventSegmentationParams
  ): Promise<EventSegmentationResponse> {
    const url = `${this.baseUrl}/events/segmentation?e={"event_type":"${params.events[0].eventType}"}&start=${params.start}&end=${params.end}`;
    const headers = this.buildHeaders(credentials);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      
      if (!response.ok) {
        const errorData = await response.json() as AmplitudeErrorResponse;
        throw new Error(`Amplitude API error: ${errorData.error || response.statusText}`);
      }
      
      return await response.json() as EventSegmentationResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to query events: ${error.message}`);
      }
      throw new Error('Unknown error occurred while querying events');
    }
  }

  /**
   * Build headers for Amplitude API requests
   * @param credentials Amplitude API credentials
   * @returns Headers object
   */
  private buildHeaders(credentials: AmplitudeCredentials): Record<string, string> {
    // Create Basic Auth header from API key and secret key
    const authString = Buffer.from(`${credentials.apiKey}:${credentials.secretKey}`).toString('base64');
    
    return {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/json'
    };
  }
}

export const amplitudeService = new AmplitudeService();