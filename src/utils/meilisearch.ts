import { MeiliSearch } from 'meilisearch';

export interface MeiliSearchConfig {
  host: string;
  apiKey: string;
}

export class MeiliSearchClient {
  private client: MeiliSearch;
  private readonly PROFILES_INDEX = 'profiles';

  constructor(config: MeiliSearchConfig) {
    this.client = new MeiliSearch({
      host: config.host,
      apiKey: config.apiKey,
    });
  }

  async ensureProfilesIndexExists(): Promise<void> {
    try {
      // Create profiles index if it doesn't exist
      await this.client.createIndex(this.PROFILES_INDEX, {
        primaryKey: 'id',
      });
    } catch (error: any) {
      // Index might already exist, ignore the error if that's the case
      if (!error.message?.includes('already exists')) {
        console.error('Error creating profiles index:', error);
      }
    }

    // Set up searchable attributes for profiles
    try {
      await this.client.index(this.PROFILES_INDEX).updateSearchableAttributes([
        'fullName',
        'bio',
        'location',
        'skills',
        'jobRole',
        'experience',
        'education',
      ]);

      // Set up filterable attributes
      await this.client.index(this.PROFILES_INDEX).updateFilterableAttributes([
        'userId',
        'jobRoleId',
        'yearsOfExperience',
        'location',
      ]);

      // Set up sortable attributes
      await this.client.index(this.PROFILES_INDEX).updateSortableAttributes([
        'fullName',
        'yearsOfExperience',
        'updatedAt',
        'createdAt',
      ]);
    } catch (error) {
      console.error('Error configuring profiles index:', error);
    }
  }

  async addOrUpdateProfile(profileData: any): Promise<void> {
    try {
      // Parse location if it's a JSON string
      let location = profileData.location;
      if (typeof location === 'string') {
        try {
          location = JSON.parse(location);
        } catch {
          // Keep as string if parsing fails
        }
      }

      const searchableProfile = {
        id: profileData.id,
        userId: profileData.userId,
        fullName: profileData.fullName || '',
        bio: profileData.bio || '',
        location: typeof location === 'object' && location?.description 
          ? location.description 
          : (location || ''),
        jobRoleId: profileData.jobRoleId || '',
        yearsOfExperience: profileData.yearsOfExperience || '0',
        updatedAt: profileData.updatedAt || new Date().toISOString(),
        createdAt: profileData.createdAt || new Date().toISOString(),
        // Add placeholder for skills and other data that might come from related tables
        skills: profileData.skills || [],
        experience: profileData.experience || [],
        education: profileData.education || [],
      };

      await this.client.index(this.PROFILES_INDEX).addDocuments([searchableProfile]);
    } catch (error) {
      console.error('Error adding/updating profile in Meilisearch:', error);
      // Don't throw error - search indexing should not break main functionality
    }
  }

  async deleteProfile(profileId: string): Promise<void> {
    try {
      await this.client.index(this.PROFILES_INDEX).deleteDocument(profileId);
    } catch (error) {
      console.error('Error deleting profile from Meilisearch:', error);
      // Don't throw error - search indexing should not break main functionality
    }
  }

  async searchProfiles(query: string, filters?: string, limit: number = 20): Promise<any> {
    try {
      const searchParams: any = {
        limit,
        attributesToHighlight: ['fullName', 'bio', 'location'],
      };

      if (filters) {
        searchParams.filter = filters;
      }

      const results = await this.client.index(this.PROFILES_INDEX).search(query, searchParams);
      return results;
    } catch (error) {
      console.error('Error searching profiles in Meilisearch:', error);
      // Return empty results on error
      return { hits: [], estimatedTotalHits: 0, query };
    }
  }

  getClient(): MeiliSearch {
    return this.client;
  }
}

// Factory function to create MeiliSearch client
export function createMeiliSearchClient(env?: any): MeiliSearchClient | null {
  try {
    // Get configuration from environment variables
    const host = env?.MEILISEARCH_HOST || 'https://hirik.online:7700';
    const apiKey = env?.MEILISEARCH_API_KEY || 'hirik_master_key';

    if (!host || !apiKey) {
      console.warn('MeiliSearch configuration not found, search functionality will be disabled');
      return null;
    }

    return new MeiliSearchClient({ host, apiKey });
  } catch (error) {
    console.error('Failed to create MeiliSearch client:', error);
    return null;
  }
}