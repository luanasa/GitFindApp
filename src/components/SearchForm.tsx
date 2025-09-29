import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchFormProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.replace("@", "").trim();
    if (cleanUsername) {
      onSearch(cleanUsername);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Auto-add @ if user starts typing without it
    if (value && !value.startsWith("@")) {
      value = "@" + value;
    }
    setUsername(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="@username"
            value={username}
            onChange={handleInputChange}
            className="gitfind-search-input"
            disabled={isLoading}
            autoFocus
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="gitfind-hero-button"
          size="lg"
        >
          <Search className="mr-2 h-5 w-5" />
          Buscar
        </Button>
      </div>
    </form>
  );
}