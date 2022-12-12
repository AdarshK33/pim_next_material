const intialStates = {
  currPgNo: 0,
  userTokenId: null,
  currTenetId: undefined,
  isLogin: false,
  token: null,
};

const reducer = (state = intialStates, { type, payload }) => {
  switch (type) {
    case "GET_CURRENT_PAGENO":
      return {
        ...state,
        currPgNo: payload,
      };
      case "GET_TENET_ID":
        return {
        ...state,
        currTenetId: payload,
      };
    case "login":
      console.log(payload);
      return { ...state, isLogin: payload.isLogin, token: payload.token };
    case "logout":
      return { ...state, isLogin: payload.isLogin, token: payload.token };
    case "refreshToken":
      return { ...state, isLogin: payload.isLogin, token: payload.token };
    default:
      return state;
  }
};

export default reducer;
