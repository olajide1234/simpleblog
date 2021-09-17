import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

import PostsLayout from "../components/posts/PostsLayout";
import Navigation from "../components/routes/Navigation";
import store from "../store/store";

import { GET_POSTS } from "../service/apollo/queries";
import { updateFiltersPosts } from "../store/actions";


const useStyles = makeStyles(() => ({
  homePage__title: {
    paddingTop: "32px",
    textAlign: "center"
  }
}));

function Home() {
  const styles = useStyles();
  const [cookies] = useCookies();
  const { data } = useQuery(GET_POSTS);
  const posts = data?.allPosts || [];
  const userId = cookies["userId"];

  const setUserFilter = (filterArg: boolean) => {
    let filters = null;
    if (filterArg) {
      filters = { authorId: userId };
    }
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
