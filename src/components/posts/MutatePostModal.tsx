import React, { useState, ChangeEvent } from "react";
import {
  Modal,
  makeStyles,
  Theme,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";

import Post from "../../service/models/posts.model";
import store from "../../store/store";

import { MUTATE_POST } from "../../service/apollo/mutations";
import { CREATE_POST } from "../../service/apollo/mutations";
import { GET_POSTS } from "../../service/apollo/queries";

const useStyles = makeStyles((theme: Theme) => ({
  mutateModal__container: {
    marginTop: "100px",
    margin: "auto",
    width: "400px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mutateModal__titleInput: {
    display: "block",
    marginTop: 16,
    marginBottom: 24,
  },
  mutateModal__btnSubmit: {
    marginTop: 24,
    display: "block",
  },
}));

interface Props {
  modalTitle: string;
  prefilledPost?: Post;
  onClose: () => void;
  isNewPost: boolean;
}

function MutatePostModal(props: Props) {
  const styles = useStyles();
  const { onClose, prefilledPost, modalTitle, isNewPost } = props;
  const [postDraft, setPostDraft] = useState<Post>(
    new Post(prefilledPost || {})
  );
  const [createPost] = useMutation(CREATE_POST);
  const [mutatePost] = useMutation(MUTATE_POST);

  const onClickSubmit = (): void => {
    const filters = store.getState().filtersPosts;
    isNewPost
      ? createPost({
          variables: { ...postDraft },
          refetchQueries: [
            { query: GET_POSTS, variables: { request: { filters } } },
          ],
        })
          .then(() => {
            onClose();
          })
          .catch((error) => {
            console.error(error);
          })
      : mutatePost({
          variables: { ...postDraft },
          refetchQueries: [
            { query: GET_POSTS, variables: { request: { filters } } },
          ],
        })
          .then(() => {
            onClose();
          })
          .catch((error) => {
            console.error(error);
          });
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
    setPostDraft({
      ...postDraft,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <Modal
      disableEnforceFocus
      disableAutoFocus
      open
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={onClose}
    >
      <div className={styles.mutateModal__container}>
        <Typography variant="h5">{modalTitle}</Typography>

        <div className={styles.mutateModal__titleInput}>
          <TextField
            required
            id="title"
            label="Title"
            placeholder="Post title"
            value={postDraft.title}
            onChange={onChangeForm}
          />
        </div>
        <TextField
          multiline
          required
          id="description"
          label="Description"
          placeholder="Post content"
          value={postDraft.description}
          onChange={onChangeForm}
        />
        <div className={styles.mutateModal__btnSubmit}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={onClickSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default MutatePostModal;
