import { GitHubUser, GitHubRepository, LanguageStats, GitHubError } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

class GitHubService {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "GitFind-App",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: GitHubError = {
        message: errorData.message || `HTTP ${response.status}`,
        status: response.status,
        documentation_url: errorData.documentation_url,
      };
      throw error;
    }

    return response.json();
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.makeRequest<GitHubUser>(`/users/${username}`);
  }

  async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    const repos = await this.makeRequest<GitHubRepository[]>(
      `/users/${username}/repos?sort=updated&per_page=100`
    );
    
    // Sort by stars descending
    return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }

  async getLanguageStats(username: string): Promise<LanguageStats> {
    try {
      const repositories = await this.getUserRepositories(username);
      const languageStats: LanguageStats = {};

      // Get language stats from each repository
      for (const repo of repositories.slice(0, 30)) { // Limit to avoid rate limiting
        if (repo.language) {
          try {
            const languages = await this.makeRequest<LanguageStats>(
              `/repos/${repo.full_name}/languages`
            );
            
            for (const [language, bytes] of Object.entries(languages)) {
              languageStats[language] = (languageStats[language] || 0) + bytes;
            }
          } catch (error) {
            // Skip if languages endpoint fails for this repo
            console.warn(`Failed to get languages for ${repo.full_name}:`, error);
          }
        }
      }

      return languageStats;
    } catch (error) {
      console.error("Failed to get language stats:", error);
      return {};
    }
  }
}

export const githubService = new GitHubService();