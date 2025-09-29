export function ActivityHeatmap() {
  // Generate mock activity data for visual representation
  const generateMockActivity = () => {
    const weeks = 15; // Show last ~3.5 months
    const data = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        // Generate random activity level (0-4)
        const level = Math.floor(Math.random() * 5);
        weekData.push(level);
      }
      data.push(weekData);
    }
    return data;
  };

  const activityData = generateMockActivity();
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr'];

  return (
    <div className="gitfind-card">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Atividade Recente</h3>
      
      <div className="space-y-3">
        {/* Month labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-6">
          {months.map((month, index) => (
            <span key={index}>{month}</span>
          ))}
        </div>

        {/* Activity grid */}
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 pr-2">
            {days.map((day, index) => (
              <div key={index} className="h-3 text-xs text-muted-foreground flex items-center">
                {index % 2 === 1 ? day : ''}
              </div>
            ))}
          </div>

          {/* Activity squares */}
          <div className="flex gap-1">
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((level, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`contribution-day contribution-level-${level}`}
                    title={`${level} contribuições`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>Menos</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`contribution-day contribution-level-${level}`}
              />
            ))}
          </div>
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}