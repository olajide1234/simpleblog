import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import PostsList from "./PostsList";
import MutatePostModal from "./MutatePostModal";

import Post from "../../service/models/posts.model";

const CREATE_POST_MODAL_TITLE = "Create a Post";

const useStyles = makeStyles(() => ({
  postLayout__container: {
    margin: "auto",
    width: "40%",
  },
  postLayout__listContainer: {
    display: "inline-block",
  },
  postLayout__btnContainer: {
    display: "inline-block",
    float: "right",
  },
}));

interface Props {
  userId: string;
  posts: Array<Post>;
}

function PostsLayout(props: Props) {
  const styles = useStyles();
  const { posts, userId } = props;

  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const openDisplayModal = (): void => setDisplayModal(true);
  const closeDisplayModal = (): void => setDisplayModal(false);

  return (
    <>
      <div className={styles.postLayout__container}>
        <span className={styles.postLayout__btnContainer}>
          <Fab color="primary" aria-label="add" onClick={openDisplayModal}>
            <AddIcon />
          </Fab>
        </span>
        <span className={styles.postLayout__listContainer}>
          <PostsList posts={posts} />
        </span>
      </div>
      {displayModal && (
        <MutatePostModal
          prefilledPost={new Post({ authorId: userId })}
          modalTitle={CREATE_POST_MODAL_TITLE}
          onClose={closeDisplayModal}
          isNewPost={true}
        />
      )}
    </>
  );
}

export default PostsLayout;
