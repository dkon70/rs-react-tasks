import style from './PaginationControls.module.scss';
import { PaginationProps } from '../types/Types';


const PaginationControls = (props: PaginationProps) => {
  const {prevPage, nextPage, page, productsPerPage, products} = props;

  return (
    <div className={style.wrapper}>
      <div className={style.items}>
        <h3>Items per page:</h3>
        <input type='number' min={1} max={100} value={products} onChange={productsPerPage} />
        <button className={style.button}>Submit</button>
      </div>
      <div className={style.page}>
        <button className={`${style.button} ${style.buttonPrev}`} onClick={prevPage}>prev</button>
        <p className={style.pageNumber}>{page}</p>
        <button className={`${style.button} ${style.buttonNext}`} onClick={nextPage}>next</button>
      </div>
    </div>
  )
}

export default PaginationControls;