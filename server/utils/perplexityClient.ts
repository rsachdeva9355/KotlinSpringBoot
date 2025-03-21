import axios from 'axios';

interface PerplexityResponse {
  id: string;
  model: string;
  created: number;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

export class PerplexityClient {
  private apiKey: string;
  private baseUrl: string = 'https://api.perplexity.ai/chat/completions';
  
  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY as string;
    if (!this.apiKey) {
      throw new Error('PERPLEXITY_API_KEY environment variable is not set');
    }
  }

  /**
   * Query the Perplexity Sonar model
   * @param prompt The prompt to send to the model
   * @returns The response from the model
   */
  async query(prompt: string): Promise<string> {
    try {
      const response = await axios.post<PerplexityResponse>(
        this.baseUrl,
        {
          model: 'sonar-small-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant providing factual information about pet services and pet care.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.1, // Lower temperature for more factual responses
          max_tokens: 1000
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      const result = response.data.choices[0]?.message.content;
      return result || 'No response from the model';
    } catch (error: any) {
      console.error('Error querying Perplexity API:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw new Error(`Failed to query Perplexity API: ${error.message}`);
    }
  }

  /**
   * Get information about pet services in a specific city
   * @param city The city to get services for
   * @param category Optional category of services (e.g. "vet", "groomer", "boarding")
   * @returns Structured information about pet services in the city
   */
  async getPetServicesForCity(city: string, category?: string): Promise<any> {
    const categoryStr = category ? ` focusing on ${category} services` : '';
    const prompt = `Please provide factual information about pet services in ${city}${categoryStr}. 
    Include the following details for each service:
    - Name of the service provider
    - Address
    - Type of service (vet, groomer, pet store, boarding, etc.)
    - Brief description
    - Contact information (phone, website if available)
    
    Format the response as valid JSON that could be directly parsed, with an array of service providers.
    Use this structure:
    {
      "services": [
        {
          "name": "Service Name",
          "address": "Full address",
          "city": "${city}",
          "category": "Type of service",
          "description": "Brief description",
          "phone": "Phone number",
          "website": "Website URL if available"
        }
      ]
    }`;

    try {
      const response = await this.query(prompt);
      
      // Extract the JSON part from the response
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                        response.match(/{[\s\S]*?}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        return JSON.parse(jsonStr);
      }
      
      // If no JSON format is detected, try to parse the entire response
      try {
        return JSON.parse(response);
      } catch (e) {
        throw new Error('Could not parse response as JSON');
      }
    } catch (error: any) {
      console.error('Error getting pet services:', error.message);
      throw error;
    }
  }

  /**
   * Get pet care information for a specific topic or category
   * @param topic The pet care topic
   * @param city Optional city for location-specific information
   * @returns Information about the requested pet care topic
   */
  async getPetCareInformation(topic: string, city?: string): Promise<any> {
    const locationStr = city ? ` in ${city}` : '';
    const prompt = `Please provide factual information about ${topic} for pets${locationStr}.
    Format the response as valid JSON that could be directly parsed, with an array of information articles.
    Use this structure:
    {
      "articles": [
        {
          "title": "Article title",
          "content": "Detailed content",
          "category": "${topic}",
          "city": "${city || 'General'}",
          "source": "Source of information if available"
        }
      ]
    }`;

    try {
      const response = await this.query(prompt);
      
      // Extract the JSON part from the response
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                        response.match(/{[\s\S]*?}/);
      
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        return JSON.parse(jsonStr);
      }
      
      // If no JSON format is detected, try to parse the entire response
      try {
        return JSON.parse(response);
      } catch (e) {
        throw new Error('Could not parse response as JSON');
      }
    } catch (error: any) {
      console.error('Error getting pet care information:', error.message);
      throw error;
    }
  }
}

// Export a singleton instance
export const perplexityClient = new PerplexityClient();