import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { UserProfile } from "@/components/UserProfile";
import { LanguagesChart } from "@/components/LanguagesChart";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
import { RepositoriesList } from "@/components/RepositoriesList";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ThemeToggle } from "@/components/ThemeToggle";
import { githubService } from "@/services/github";
import { GitHubUser, GitHubRepository, LanguageStats, GitHubError } from "@/types/github";

const Index = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GitHubError | Error | null>(null);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    setRepositories([]);
    setLanguages({});

    try {
      // Fetch user data and repositories in parallel
      const [userData, reposData] = await Promise.all([
        githubService.getUser(username),
        githubService.getUserRepositories(username),
      ]);

      setUser(userData);
      setRepositories(reposData);

      // Fetch language stats separately to avoid blocking the UI
      githubService.getLanguageStats(username).then(setLanguages);
    } catch (err) {
      setError(err as GitHubError | Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (user?.login) {
      handleSearch(user.login);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">GitFind</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!user && !isLoading && !error && (
          <div className="text-center py-16 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Descubra perfis do{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  GitHub
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore estatísticas detalhadas, repositórios mais populares e análise de linguagens de programação
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>

            <div className="pt-8">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>Exemplos:</span>
                {["torvalds", "gaearon", "sindresorhus", "vercel"].map((username) => (
                  <button
                    key={username}
                    onClick={() => handleSearch(username)}
                    className="gitfind-language-tag hover:bg-primary/30"
                  >
                    @{username}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar for Results Page */}
        {(user || isLoading || error) && (
          <div className="mb-8">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorMessage error={error} onRetry={handleRetry} />
        )}

        {/* User Data */}
        {user && !isLoading && !error && (
          <div className="space-y-8">
            {/* User Profile */}
            <UserProfile user={user} />

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LanguagesChart languages={languages} />
              <ActivityHeatmap />
            </div>

            {/* Repositories */}
            <RepositoriesList repositories={repositories} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Desenvolvido por Luana Sá
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
