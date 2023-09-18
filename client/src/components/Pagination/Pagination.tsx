import style from './Pagination.module.scss'
import {setCurrentPage} from "../../store/slices/Posts/PostsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import Pagination from '@mui/material/Pagination';

const PaginationComponent = () => {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages } = useAppSelector((state) => state.posts);

    const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    }

    return (
        <div className={style.paginationCon}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};

export default PaginationComponent;
