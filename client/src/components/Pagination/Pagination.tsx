import style from './Pagination.module.scss'
import {setCurrentPage} from "../../store/slices/Posts/PostsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";

const Pagination = () => {
    const dispatch = useAppDispatch();
    const {currentPage, totalPages} = useAppSelector((state) => state.posts);

    const handlePageClick = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
    }

    const renderPageButtons = () => {
        const pageButtons = []

        for (let page = 1; page <= totalPages; page++) {
            pageButtons.push(
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    disabled={currentPage === page}
                >
                    {page}
                </button>
            )
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Добавляет плавную анимацию прокрутки
        });

        return pageButtons
    }

    return (
        <div className={style.paginationCon}>
            {renderPageButtons()}
        </div>
    );
};

export default Pagination;
