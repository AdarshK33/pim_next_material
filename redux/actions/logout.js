import { client } from "../../utils/axios";

export const logoutApi = () => {
  return (dispatch) => {
    client
      .get("/api/logout")
      .then((response) => {
        if (response?.status === 200) {
          console.log("logoutApi session expired");
          location.reload()
        }
      })
      .catch((err) => {
        console.log("logoutApi err", err);
      });
  };
};