export function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Hero Card Skeleton */}
      <div className="gitfind-card">
        <div className="flex items-start gap-6">
          <div className="gitfind-skeleton w-24 h-24 rounded-full"></div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="gitfind-skeleton h-8 w-64"></div>
              <div className="gitfind-skeleton h-5 w-32"></div>
            </div>
            <div className="gitfind-skeleton h-4 w-96"></div>
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="gitfind-skeleton h-8 w-20 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages Chart Skeleton */}
        <div className="gitfind-card">
          <div className="gitfind-skeleton h-6 w-48 mb-4"></div>
          <div className="gitfind-skeleton h-64 w-full"></div>
        </div>

        {/* Activity Heatmap Skeleton */}
        <div className="gitfind-card">
          <div className="gitfind-skeleton h-6 w-48 mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-1">
                {Array.from({ length: 15 }).map((_, j) => (
                  <div key={j} className="gitfind-skeleton w-3 h-3 rounded-sm"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Repositories Skeleton */}
      <div className="gitfind-card">
        <div className="gitfind-skeleton h-6 w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="gitfind-repo-card">
              <div className="space-y-3">
                <div className="gitfind-skeleton h-5 w-48"></div>
                <div className="gitfind-skeleton h-4 w-full"></div>
                <div className="flex justify-between items-center">
                  <div className="gitfind-skeleton h-4 w-16"></div>
                  <div className="flex gap-4">
                    <div className="gitfind-skeleton h-4 w-8"></div>
                    <div className="gitfind-skeleton h-4 w-8"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}