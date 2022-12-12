const currentPgNo = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_CURRENT_PAGENO",
      payload,
    });
  };
};
const userLogin = (payload) => {
  console.log("##", payload);
  return (dispatch) => {
    return dispatch({
      type: "login",
      payload,
    });
  };
};
const userLogout = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: "logout",
      payload,
    });
  };
};
const userTenetID = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_TENET_ID",
      payload,
    });
  };
};

const actions = {
  currentPgNo,
  userLogin,
  userLogout,
  userTenetID
};

export default actions;
