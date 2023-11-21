import style from './UserPosts.module.scss'

const UserPosts = () => {
    return (
        <div className={style.postsContainer}>
            <div className={style.imgList}>
                <img src="https://cdn-icons-png.flaticon.com/512/2175/2175188.png" alt="/"/>
                <img src="https://img.freepik.com/free-photo/a-digital-painting-of-a-mountain-with-a-colorful-tree-in-the-foreground_1340-25699.jpg?size=626&ext=jpg" alt="/"/>
                <img src="https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?size=626&ext=jpg" alt="/"/>

                <img src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?size=626&ext=jpg" alt="/"/>
                <img src="https://cdn-icons-png.flaticon.com/512/2175/2175188.png" alt="/"/>
                <img src="https://cdn-icons-png.flaticon.com/512/2175/2175188.png" alt="/"/>
            </div>
        </div>
    );
};

export default UserPosts;
