import style from './Pagination.module.scss'
import {setCurrentPage} from "../../store/slices/Posts/PostsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";

const Pagination = () => {
    const dispatch = useAppDispatch();
    const {currentPage, totalPages} = useAppSelector((state) => state.posts);

    return (
        <div className={style.paginationCon}>
            <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>
                Предыдущая
            </button>
            <span>
                Страница {currentPage} из {totalPages}
            </span>
            <button onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                    disabled={currentPage === totalPages}>
                Следующая
            </button>
        </div>
    );
};

export default Pagination;
