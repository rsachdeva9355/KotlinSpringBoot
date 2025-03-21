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
  citations?: string[];
}

export class PerplexityClient {
  private apiKey: string;
  private baseUrl: string = 'https://api.perplexity.ai/chat/completions';

  constructor() {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      throw new Error('PERPLEXITY_API_KEY environment variable is not set');
    }
    this.apiKey = apiKey;
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
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content: "You are a helpful and concise pet care expert assistant."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
          stream: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
      
      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('Error querying Perplexity API:', error.response?.data || error.message);
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
    let prompt = `Please provide a comprehensive list of pet services in ${city}`;
    
    if (category) {
      prompt += ` specifically focused on ${category} services`;
    }
    
    prompt += `. For each service, include the name, address, contact information, website (if available), 
    hours of operation, types of animals served, and a brief description of services offered. 
    Format the information clearly and concisely. Please ensure all information is accurate and up-to-date.`;

    const response = await this.query(prompt);
    
    try {
      // Attempt to parse structured data from the response
      // This is a simplistic approach - in a production environment you'd want more robust parsing
      return {
        city,
        category: category || 'all',
        content: response,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error parsing Perplexity response:', error);
      return {
        city,
        category: category || 'all',
        content: response,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get pet care information for a specific topic or category
   * @param topic The pet care topic
   * @param city Optional city for location-specific information
   * @returns Information about the requested pet care topic
   */
  async getPetCareInformation(topic: string, city?: string): Promise<any> {
    let prompt = `Please provide detailed information about ${topic} for pet owners`;
    
    if (city) {
      prompt += ` in ${city}`;
    }
    
    prompt += `. Include practical advice, best practices, common concerns, and any location-specific 
    considerations. If there are multiple perspectives or approaches, please present them fairly. 
    If there are relevant resources or services pet owners should know about, please mention those as well.`;

    const response = await this.query(prompt);
    
    return {
      topic,
      city: city || 'general',
      content: response,
      timestamp: new Date().toISOString()
    };
  }
}

export const perplexityClient = new PerplexityClient();