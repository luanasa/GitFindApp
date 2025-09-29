import { Star, GitFork, ExternalLink } from "lucide-react";
import { GitHubRepository } from "@/types/github";

interface RepositoriesListProps {
  repositories: GitHubRepository[];
}

export function RepositoriesList({ repositories }: RepositoriesListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  if (repositories.length === 0) {
    return (
      <div className="gitfind-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Top Repositórios</h3>
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          <p>Nenhum repositório público encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gitfind-card">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Top Repositórios</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repositories.slice(0, 8).map((repo) => (
          <div key={repo.id} className="gitfind-repo-card group">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {repo.name}
                  </a>
                </h4>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
              </div>

              {repo.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="text-muted-foreground">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{formatNumber(repo.stargazers_count)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    <span>{formatNumber(repo.forks_count)}</span>
                  </div>
                </div>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Atualizado em {formatDate(repo.updated_at)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}