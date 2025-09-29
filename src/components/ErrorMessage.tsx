import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubError } from "@/types/github";

interface ErrorMessageProps {
  error: GitHubError | Error;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const isGitHubError = (error: any): error is GitHubError => {
    return typeof error === 'object' && error.status !== undefined;
  };

  const getErrorMessage = () => {
    if (isGitHubError(error)) {
      switch (error.status) {
        case 404:
          return {
            title: "Usuário não encontrado",
            description: "Verifique se o nome de usuário está correto e tente novamente.",
          };
        case 403:
          return {
            title: "Limite de requisições atingido",
            description: "A API do GitHub atingiu o limite de requisições. Tente novamente em alguns minutos.",
          };
        case 422:
          return {
            title: "Nome de usuário inválido",
            description: "O nome de usuário fornecido não é válido. Verifique e tente novamente.",
          };
        default:
          return {
            title: "Erro na API do GitHub",
            description: error.message || "Ocorreu um erro ao buscar os dados do GitHub.",
          };
      }
    }

    return {
      title: "Erro de conexão",
      description: "Verifique sua conexão com a internet e tente novamente.",
    };
  };

  const { title, description } = getErrorMessage();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="gitfind-card text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
}