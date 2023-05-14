import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_ROLE,
  USER_BRAND,
  USER_EMAIL,
  GET_USER_LIST_DATA_LOADING,
  GET_USER_LIST_DATA_SUCCESS,
  GET_USER_LIST_DATA_FAILURE,
  GET_ROLE_DATA_LOADING,
  GET_ROLE_DATA_SUCCESS,
  GET_ROLE_DATA_FAILURE,
  CREATE_USER_DATA_LOADING,
  CREATE_USER_DATA_SUCCESS,
  CREATE_USER_DATA_FAILURE,
  GET_ROLES_PRIVILEGE_LOADING,
  GET_ROLES_PRIVILEGE_SUCCESS,
  GET_ROLES_PRIVILEGE_FAILURE,
  MY_PROFILE_DATA_LOADING,
  MY_PROFILE_DATA_SUCCESS,
  MY_PROFILE_DATA_FAILURE,
} from "../types/types";

import { client } from "../../utils/axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

export const userLoginLoading = () => {
  return {
    type: USER_LOGIN_LOADING,
  };
};
export const userLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
  };
};
export const userLoginFailure = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
  };
};

export const userRole = (data) => {
  return {
    type: USER_ROLE,
    payload: data,
  };
};
export const userBrand = (data) => {
  return {
    type: USER_BRAND,
    payload: data,
  };
};
export const userEmail = (data) => {
  return {
    type: USER_EMAIL,
    payload: data,
  };
};

export const getUserDataLoading = () => {
  return {
    type: GET_USER_LIST_DATA_LOADING,
  };
};
export const getUserDataSuccess = (data) => {
  return {
    type: GET_USER_LIST_DATA_SUCCESS,
    payload: data,
  };
};
export const getUserDataFailure = (error) => {
  return {
    type: GET_USER_LIST_DATA_FAILURE,
    payload: error,
  };
};

export const getRoleDataLoading = () => {
  return {
    type: GET_ROLE_DATA_LOADING,
  };
};
export const getRoleDataSuccess = (data) => {
  return {
    type: GET_ROLE_DATA_SUCCESS,
    payload: data,
  };
};
export const getRoleDataFailure = (error) => {
  return {
    type: GET_ROLE_DATA_FAILURE,
    payload: error,
  };
};

export const createUserDataLoading = () => {
  return {
    type: CREATE_USER_DATA_LOADING,
  };
};
export const createUserDataSuccess = (data) => {
  return {
    type: CREATE_USER_DATA_SUCCESS,
    payload: data,
  };
};
export const createUserDataFailure = (error) => {
  return {
    type: CREATE_USER_DATA_FAILURE,
    payload: error,
  };
};

export const getRolesPrivilegeLoading = () => {
  return {
    type: GET_ROLES_PRIVILEGE_LOADING,
  };
};
export const getRolesPrivilegeSuccess = (data) => {
  return {
    type: GET_ROLES_PRIVILEGE_SUCCESS,
    payload: data,
  };
};
export const getRolesPrivilegeFailure = (error) => {
  return {
    type: GET_ROLES_PRIVILEGE_FAILURE,
    payload: error,
  };
};

export const getUserDetailDataLoading = () => {
  return {
    type: MY_PROFILE_DATA_LOADING,
  };
};
export const getUserDetailDataSuccess = (data) => {
  return {
    type: MY_PROFILE_DATA_SUCCESS,
    payload: data,
  };
};
export const getUserDetailDataFailure = (error) => {
  return {
    type: MY_PROFILE_DATA_FAILURE,
    payload: error,
  };
};

export const userLoginApi = (data) => {
  // console.log("hello  userLoginApi called",data)
  return (dispatch) => {
    dispatch(userLoginLoading("LOGIN....", "LOGIN"));
    client
      .post("/api/login/userLogin", data)
      .then((response) => {
        // console.log("hello userLoginApi", response);
        toast.info("Login Successfully !!!");
        if (response?.data?.statusCode === 201) {
          // console.log("hello Login post==>", response.data);
          dispatch(
            userLoginSuccess(
              response?.data?.statusCode,
              "Login Post Successfully",
              "LOGIN POST"
            )
          );
          dispatch(
            userRole(
              response?.data?.result?.role,
              "Login role saved Successfully",
              "LOGIN DETAILS"
            )
          );
          dispatch(
            userBrand(
              response?.data?.result?.brand,
              "Login brand saved Successfully",
              "LOGIN DETAILS"
            )
          );
          dispatch(
            userEmail(
              response?.data?.result?.email,
              "Login email saved Successfully",
              "LOGIN DETAILS"
            )
          );
          console.log(
            "response?.data?.result?.role",
            response?.data?.result?.role
          );

          // navigate('/dashboard/dashboard');
        } else throw new Error("");
      })
      .catch((err) => {
        toast.error("User Not Found!!!");
        console.log("error caught in -> actions/login", err);
        dispatch(userLoginFailure(err, "Something went wrong", "LOGIN POST"));
      });
  };
};

export const getUserListApi = (pageNo, pageSize) => {
  const data = {
    pageNo: pageNo,
    pageSize: pageSize,
  };
  return (dispatch) => {
    dispatch(getUserDataLoading("USER....", "USER"));
    client
      .post("/api/login/userList", data)
      .then((response) => {
        // console.log(" getUserListApi response", response);

        if (response?.data.statusCode === 200) {
          // console.log("API SUCCESS2", response.data);
          dispatch(getUserDataSuccess(response.data.result));
        }
      })
      .catch((err) => {
        console.log("actions/login/GET USER LIST =>FAILURE", err);
        dispatch(getUserDataFailure(err));
      });
  };
};

export const getRoleApi = () => {
  return (dispatch) => {
    dispatch(getRoleDataLoading("ROLE....", "ROLE"));
    client
      .get("/api/login/getRole")
      .then((response) => {
        // console.log("hello api response",response.status)
        //   console.log(response)
        if (response?.status === 200) {
          console.log("hello API  getRoleApi SUCCESS2", response);
          dispatch(getRoleDataSuccess(response.data));
        }
      })
      .catch((err) => {
        console.log("actions/login/ GET ROLE =>FAILURE", err);
        dispatch(getRoleDataFailure(err));
      });
  };
};

export const createUserApi = (data) => {
  // let result = false;
  // console.log("hello   called", data);
  return (dispatch) => {
    dispatch(createUserDataLoading("USER CREATE....", "USER"));
    client
      .post("/api/login/userCreate", data)
      .then((response) => {
        // console.log("---------userApi------", response.status);
        // result = true;
        if (response.status === 200) {
          // toast.info("User Create Successfully !!!");
          // console.log("user ==>", response.data.result);
          dispatch(
            createUserDataSuccess(
              response.data.result,
              "User Create Successfully",
              "User CREATE"
            )
          );
        } else throw new Error("");
      })
      .catch((err) => {
        // toast.error("User Data Not Found!!!");
        console.log("error caught in -> actions/login/createUser", err);
        //result = false;
        dispatch(
          createUserDataFailure(err, "Something went wrong", "User CREATE")
        );
      });

    // return result;
  };
};

export const getRolePrivilegeApi = () => {
  return (dispatch) => {
    dispatch(getRolesPrivilegeLoading("ROLE....", "PRIVILEGES"));
    client
      .get("/api/login/rolesPrivilege")
      .then((response) => {
        if (response?.status === 200) {
          console.log("getRolesPrivilegeSuccess", response);
          dispatch(getRolesPrivilegeSuccess(response.data));
        }
      })
      .catch((err) => {
        console.log(
          "error caught in -> actions/login/getRolePrivilegeApi",
          err
        );

        dispatch(getRolesPrivilegeFailure(err));
      });
  };
};

export const myProfileAPi = () => {
  return (dispatch) => {
    dispatch(getUserDetailDataLoading("MY PROFILE....", "PROFILE"));
    client
      .get("/api/userApi")
      .then((response) => {
        console.log(
          "<<<<<<<<<<<<<<<<<<My Profile>>>>>>>>>>>>>>>>>>>>>>>",
          response
        );
        dispatch(
          getUserDetailDataSuccess(
            response?.data?.statusCode,
            "Login Post Successfully",
            "LOGIN POST"
          )
        );
        dispatch(
          userRole(
            response?.data?.role,
            "User role saved Successfully",
            "User DETAILS"
          )
        );

        dispatch(
          userEmail(
            response?.data?.email,
            "User email saved Successfully",
            "User DETAILS"
          )
        );
      })
      .catch((err) => {
        console.log("error caught in -> actions/login/myProfileAPi", err);
        dispatch(getUserDetailDataFailure(err));
      });
  };
};
