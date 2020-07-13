import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostsLayout from "../components/posts/PostsLayout";
// import { useQuery } from "@apollo/react-hooks";
// import { GET_POSTS } from "../service/apollo/queries";
import { GET_POSTS } from '../tests/mocks/gqlMock'
import Navigation from "../components/routes/Navigation";
import { useCookies } from "react-cookie";
import store from "../store/store";
import { updateFiltersPosts } from "../store/actions";


const useStyles = makeStyles(() => ({
  homePage__title: {
    paddingTop: "32px",
    textAlign: "center"
  }
}));

function Home() {
  const [filters, setFilters] = useState<any>(null);
  const styles = useStyles();
  const [cookies] = useCookies();
  const { data } = GET_POSTS;
  const posts = data?.getPostsWithFilters?.posts || [];
  const userId = cookies["userId"];

  const setUserFilter = (withFilters: boolean) => {
    let filters = null;
    if (withFilters) {
      filters = { authorId: userId };
    }
    setFilters(filters);
    store.dispatch(updateFiltersPosts(filters));
  };

  return (
    <div>
      <Navigation linkPath="/logout" linkTitle="Logout" />
      <h1 className={styles.homePage__title}>Simple Blog</h1>
      <PostsLayout userId={userId} posts={posts} setFilters={setUserFilter} />
    </div>
  );
}

export default Home;
