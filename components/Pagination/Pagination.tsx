'use client';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <div className={css.pagination}>
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={handlePageChange}
        containerClassName={css.pagination}
        activeClassName={css.active}
        pageLinkClassName={css.pageLink}
        previousLabel="<"
        nextLabel=">"
        previousClassName={css.nav}
        nextClassName={css.nav}
        disabledClassName={css.disabled}
      />
    </div>
  );
}