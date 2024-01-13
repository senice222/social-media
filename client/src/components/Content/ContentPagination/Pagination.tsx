import style from './Pagination.module.scss'
import {setCurrentPage} from "../../../store/slices/Posts/PostsSlice";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import Pagination from '@mui/material/Pagination';
import {ChangeEvent, FC} from "react";
import {PaginationProps} from "../../../interfaces/Pagination";

const PaginationComponent: FC<PaginationProps> = ({currentPage, totalPages}) => {
    const dispatch = useAppDispatch();

    const handlePageChange = (event: ChangeEvent<unknown>, pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <div className={style.paginationCon}>
            <Pagination color="primary" count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};

export default PaginationComponent;
