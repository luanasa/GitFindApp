import { Home, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <Search className="w-12 h-12 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
            <p className="text-muted-foreground">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <a href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Voltar ao início
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
