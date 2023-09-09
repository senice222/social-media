import style from './Content.module.scss'
import CreatePost from "../CreatePost/CreatePost.tsx";
import ContentItem from "./ContentItem.tsx";

const ContentList = () => {
    return (
        <div className={style.middleSide}>
            <CreatePost />

            <ContentItem />
        </div>
    );
};

export default ContentList;
