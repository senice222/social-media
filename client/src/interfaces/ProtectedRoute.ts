import {ReactNode} from "react";
import {User} from '../interfaces/Auth'

export interface Children {
    children: ReactNode;
    user?: User | null; 
}