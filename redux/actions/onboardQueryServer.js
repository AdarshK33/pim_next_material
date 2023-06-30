// import {
//   CATEGORY_DROPDOWN_LIST_LOADING,
//   CATEGORY_DROPDOWN_LIST_SUCCESS,
//   CATEGORY_DROPDOWN_LIST_FAILURE,
// } from "../types/types";

// import { client } from "../../utils/axios";
// // import { toast } from "react-toastify";

// export const categoryDropdownListLoading = () => {
//   return {
//     type: CATEGORY_DROPDOWN_LIST_LOADING,
//   };
// };
// export const categoryDropdownListSuccess = (data) => {
//   return {
//     type: CATEGORY_DROPDOWN_LIST_SUCCESS,
//     payload: data,
//   };
// };
// export const categoryDropdownListFailure = (error) => {
//   return {
//     type: CATEGORY_DROPDOWN_LIST_FAILURE,
//     payload: error,
//   };
// };

// export const getCategoryDropdown = () => {
//   return (dispatch) => {
//     dispatch(categoryDropdownListLoading("GET BRAND....", "DROPDOWN"));
//     client
//       .get("/api/catalogQuery/categoryDropdown")
//       .then((response) => {
//         // console.log("hello getbrandDropdown",response)
//         //   console.log(response)
//         if (response?.status === 200) {
//           // console.log("hello API status getbrandDropdown", response);
//           dispatch(categoryDropdownListSuccess(response.data));
//         }
//       })
//       .catch((err) => {
//         console.log(
//           "actions/onboardQuery/ GET CATEGORY => DROPDOWN FAILURE",
//           err
//         );
//         dispatch(categoryDropdownListFailure(err));
//       });
//   };
// };
