import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import {
  Typography,
  CardContent,
  makeStyles,
  CardHeader,
  CardActions,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { useMutation } from "@apollo/react-hooks";

import MutatePostModal from "./MutatePostModal";
import PostVoteContainer from "./PostVoteContainer";

import Post from "../../service/models/posts.model";
import { DELETE_POSTS_BY_IDS } from "../../service/apollo/mutations";
import { GET_POSTS } from "../../service/apollo/queries";

import store from "../../store/store";

const useStyles = makeStyles(() => ({
  postCard__title: {
    fontWeight: "bold",
  },
  postCard__container: {
    width: "500px",
    marginTop: "5%",
  },
}));

interface Props {
  post: Post;
}

const EDIT_POST_MODAL_TITLE = "Edit a Post";

function PostCard(props: Props) {
  const { post } = props;
  const { id: postId, title, description, authorId } = post;
  const styles = useStyles();
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [deletePost] = useMutation(DELETE_POSTS_BY_IDS);

  const Author = authorId ? `User ${authorId}` : "Anonymous";

  const onClickClearBtn = (): void => {
    const filters = store.getState().filtersPosts;
    deletePost({
      variables: { id: String(postId) },
      refetchQueries: [
        {
          query: GET_POSTS,
          variables: { request: { filters } },
        },
      ],
    })
      .then(() => {})
      .catch(() => {});
  };

  const openDisplayModal = (): void => setDisplayModal(true);
  const closeDisplayModal = (): void => setDisplayModal(false);

  return (
    <Card variant="outlined" className={styles.postCard__container}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="delete-post" onClick={onClickClearBtn}>
              <ClearIcon />
            </IconButton>
            <IconButton aria-label="delete-post" onClick={openDisplayModal}>
              <EditIcon />
            </IconButton>
          </>
        }
        title={
          <Typography variant="h6" className={styles.postCard__title}>
            {title}
          </Typography>
        }
        subheader={<Typography variant="caption">author: {Author}</Typography>}
      />
      <CardContent>
        <Typography variant="subtitle1">{description}</Typography>
      </CardContent>
      <CardActions>
        <PostVoteContainer post={post} />
      </CardActions>
      {displayModal && (
        <MutatePostModal
          modalTitle={EDIT_POST_MODAL_TITLE}
          prefilledPost={post}
          onClose={closeDisplayModal}
          isNewPost={false}
        />
      )}
    </Card>
  );
}

export default PostCard;
