export const postKey = {
  GET_HOME_FEED: "GET_HOME_FEED",
  GET_EXPLORE: "GET_EXPLORE",
  GET_DETAIL_POST: (_id) => `GET_DETAIL_POST_${_id}`,
  GET_REPLY_COMMENT: (parent_id, show) =>
    `GET_REPLY_COMMENT_${parent_id}_${show}`,
  GET_MYPOST: (_id) => `GET_MYPOST_${_id}`,
};

export const accountKey = {
  GET_SUGGEST_ACCOUNT: "GET_SUGGEST_ACCOUNT",
};

export const usersKey = {
  GET_INFO: (_id) => `GET_INFO_${_id}`,
};

export const notificationKey = {
  GET_NOTIFICATION: "GET_NOTIFICATION",
};
