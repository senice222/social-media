export interface File {
    uid: string;
    lastModified?: number;
    name: string;
    originFileObj?: any;
    size?: number;
    type?: string;
}