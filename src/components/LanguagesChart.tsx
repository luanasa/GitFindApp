import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { LanguageStats } from "@/types/github";

interface LanguagesChartProps {
  languages: LanguageStats;
}

const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#239120",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#1572B6",
  Vue: "#2c3e50",
  React: "#61DAFB",
  Other: "#8b5cf6",
};

export function LanguagesChart({ languages }: LanguagesChartProps) {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
  const data = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8) // Top 8 languages
    .map(([language, bytes]) => ({
      name: language,
      value: bytes,
      percentage: ((bytes / total) * 100).toFixed(1),
      color: LANGUAGE_COLORS[language] || LANGUAGE_COLORS.Other,
    }));

  if (data.length === 0) {
    return (
      <div className="gitfind-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Linguagens de Programação</h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <p>Nenhuma linguagem encontrada</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="gitfind-card">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Linguagens de Programação</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {data.slice(0, 5).map((lang) => (
            <span key={lang.name} className="gitfind-language-tag">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: lang.color }}
              />
              {lang.name} ({lang.percentage}%)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}