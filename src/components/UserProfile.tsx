import { MapPin, Building, Link as LinkIcon, Calendar, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubUser } from "@/types/github";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const { toast } = useToast();

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(user.html_url);
      toast({
        title: "Link copiado!",
        description: "O link do perfil foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="gitfind-card">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="shrink-0">
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            className="w-24 h-24 rounded-full border-2 border-border shadow-lg"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user.name || user.login}
              </h1>
              <p className="text-lg text-muted-foreground">@{user.login}</p>
            </div>

            {user.bio && (
              <p className="text-foreground leading-relaxed">{user.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.company && (
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Entrou em {formatDate(user.created_at)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="gitfind-stat-badge">
                <strong>{user.public_repos}</strong> repositórios
              </span>
              <span className="gitfind-stat-badge">
                <strong>{user.followers}</strong> seguidores
              </span>
              <span className="gitfind-stat-badge">
                <strong>{user.following}</strong> seguindo
              </span>
              <span className="gitfind-stat-badge">
                <strong>{user.public_gists}</strong> gists
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="default" asChild>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver no GitHub
                </a>
              </Button>
              <Button variant="outline" onClick={copyProfileLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}