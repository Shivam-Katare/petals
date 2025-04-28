import { AlertTriangle } from "lucide-react";

export function ImportantNote() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">
            Some grid layouts might look different when you paste them into your project if you don&apos;t add extra spacing (gap, padding) or border styles.
            Especially for custom-built grids, ensure you apply basic CSS (e.g., gap: 10px; or border: 1px solid #eee;) to maintain the visual structure you see inside Petals.
          </p>
        </div>
      </div>
    </div>
  );
} 