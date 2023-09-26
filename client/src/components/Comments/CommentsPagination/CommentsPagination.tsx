import {ChangeEvent, FC} from "react";
import {CommentPaginationProps} from "../../../interfaces/PostsI.ts";
import Pagination from "@mui/material/Pagination";
import style from './CommentsPagination.module.scss'

const CommentsPagination: FC<CommentPaginationProps> = ({ setCurrentPage, currentPage, totalPages }) => {

    const paginate = (event: ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className={style.paginationContainer}>
            {totalPages !== 1 && <Pagination color="primary"
                                             count={totalPages}
                                             page={currentPage}
                                             onChange={paginate}
            />}
        </div>
    );
};

export default CommentsPagination;
