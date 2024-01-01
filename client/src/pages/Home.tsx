import Layout from "../layouts/Layout";
import ContentList from "../components/Content/ContentList";
import { FC } from "react";
import { UserProps } from "../interfaces/Auth";

const Home:FC<UserProps> = ({user}) => {
    return (
        <Layout user={user}>
            <ContentList user={user}/>
        </Layout>
    );
};
export default Home