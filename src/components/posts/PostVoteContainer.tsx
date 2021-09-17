import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

import { MUTATE_VOTE } from "../../service/apollo/mutations";
import { GET_POSTS } from "../../service/apollo/queries";
import Post from "../../service/models/posts.model";

import store from "../../store/store";

type Props = {
  post: Post;
};

enum PostVoteType {
  UP = "UP",
  DOWN = "DOWN",
}

enum ColorType {
  PRIMARY = "primary",
  INHERIT = "inherit",
}

function findPreviousVote(votes: any[], userId: number): PostVoteType {
  return votes.find((vote) => Number(vote.user.id) === Number(userId))?.user
    ?.vote;
}

function PostVoteContainer(props: Props) {
  const {
    post: { id: postId, votes },
  } = props;
  const [mutateVote] = useMutation(MUTATE_VOTE);
  const [cookies] = useCookies();
  const authorId = cookies["userId"];
  const filters = store.getState().filtersPosts;
  const currentVote = findPreviousVote(votes, authorId);

  const thumbColor = (targetVote: PostVoteType): ColorType => {
    return currentVote === targetVote ? ColorType.PRIMARY : ColorType.INHERIT;
  };

  const onClickIcon = (vote: PostVoteType): void => {
    if (vote === currentVote) {
      executeDeleteVote();
    } else {
      executeAddVote(vote);
    }
  };

  const executeAddVote = (vote: PostVoteType): void => {
    mutateVote({
      variables: {
        id: postId,
        votes: [...votes, { user: { id: authorId, vote: vote } }],
      },
      refetchQueries: [
        {
          query: GET_POSTS,
          variables: { request: { filters } },
        },
      ],
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const executeDeleteVote = (): void => {
    const updatedVotes = votes.filter((vote) => vote.user.id !== authorId);
    mutateVote({
      variables: { id: postId, votes: [...updatedVotes] },
      refetchQueries: [
        {
          query: GET_POSTS,
          variables: { request: { filters } },
        },
      ],
    })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleIconDownClick = (): void => onClickIcon(PostVoteType.DOWN);
  const handleIconUpClick = (): void => onClickIcon(PostVoteType.UP);

  return (
    <>
      <Button onClick={handleIconUpClick}>
        <ThumbUpIcon color={thumbColor(PostVoteType.UP)} />
      </Button>
      <Button onClick={handleIconDownClick}>
        <ThumbDownIcon color={thumbColor(PostVoteType.DOWN)} />
      </Button>
    </>
  );
}

export default PostVoteContainer;
