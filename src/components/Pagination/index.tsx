import { FC } from 'react'
import styles from './Pagination.module.scss'
import * as ReactPaginateModule from 'react-paginate';

const ReactPaginate: any =
  (ReactPaginateModule as any).default?.default ||
  (ReactPaginateModule as any).default ||
  ReactPaginateModule;

type PaginationProps ={
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e: { selected: number }) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={4}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Pagination