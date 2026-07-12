import styles from './Pagination.module.scss'
import ReactPaginateModule from 'react-paginate';
const ReactPaginate = ReactPaginateModule.default;

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => onChangePage(e.selected + 1)}
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