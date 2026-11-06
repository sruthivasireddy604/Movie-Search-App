interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Movie result pages">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>← Previous</button>
      <span>Page <strong>{page}</strong> of {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>Next →</button>
    </nav>
  );
}