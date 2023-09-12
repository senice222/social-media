import {Post} from "../schemas/post.schema";

export interface Paginated {
    posts: Post[], 
    total: number, 
    totalPages: number;
}