import Layout from "../layouts/Layout.tsx";
import ContentList from "../components/Content/ContentList.tsx";
import { FC } from "react";
import { UserProps } from "../interfaces/Auth.ts";

const Home:FC<UserProps> = ({user}) => {
    return (
        <Layout user={user}>
            <ContentList user={user}/>
        </Layout>
    );
};
export default Home