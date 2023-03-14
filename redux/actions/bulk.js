import {
    CREATE_BULK_DATA_LOADING,
    CREATE_BULK_DATA_SUCCESS,
    CREATE_BULK_DATA_FAILURE,
} from "../types/types";

import { client } from "../../utils/axios";

export const createBulkDataLoading = () => {
    return {
        type: CREATE_BULK_DATA_LOADING,
    };
};
export const createBulkDataSuccess = (data) => {
    return {
        type: CREATE_BULK_DATA_SUCCESS,
        payload: data,
    };
};
export const createBulkDataFailure = (error) => {
    return {
        type: CREATE_BULK_DATA_FAILURE,
        payload: error,
    };
};


export const createBulkApi = (data) => {
    // console.log("hello  brandPageApi called", data);
    return (dispatch) => {
        dispatch(createBulkDataLoading("BRAND....", "BRAND"));
        client
            .post("/api/sync/createBulk", data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(
                        createBulkDataSuccess(
                            response.data.result,
                            "Bulk Create Successfully",
                            "BULK CREATE"
                        )
                    );
                } else throw new Error("");
            })
            .catch((err) => {
                console.log("error caught in -> actions/bulk/create", err);

                dispatch(
                    createBulkDataFailure(err, "Something went wrong", "BULK CREATE")
                );
            });
    };
};

