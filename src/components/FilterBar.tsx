import type { SortOption } from "../types";

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  minimumRating: number;
  onRatingChange: (value: number) => void;
}

export default function FilterBar({
  sortBy, onSortChange, minimumRating, onRatingChange
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Movie filters">
      <label>
        Sort by
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value as SortOption)}>
          <option value="relevance">Relevance</option>
          <option value="release">Release date (newest)</option>
          <option value="rating">Rating (highest)</option>
        </select>
      </label>
      <label>
        Minimum rating: <strong>{minimumRating.toFixed(1)}</strong>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minimumRating}
          onChange={(event) => onRatingChange(Number(event.target.value))}
        />
      </label>
    </section>
  );
}