import React, {
    Fragment,
    useMemo,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";

import {
    Grid,
    FormControl,
    FormLabel,
    InputLabel,
    Input,
    Select,
    MenuItem,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import styles from "./attribute.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createAttributeSetApi } from "../../../redux/actions/catalogServiceNew";
import { ToastContainer } from "react-toastify";
import { addmasterAttribute, addmasterAttributeApi } from "../../../redux/actions/channel";

function AddAttributeForm({ classModal, id }) {
    console.log("classModal", classModal);
    const dispatch = useDispatch();

    const { loginReducer, catalogQueryReducer, loading } = useSelector(
        (state) => {
            return state;
        }
    );
    const [isLoading, setIsLoading] = useState(false);

    console.log("catalogQueryReducer", catalogQueryReducer);

    const dropdownOptions = catalogQueryReducer?.catagories?.map((item) => ({
        value: item.id,
        name: item.name,
    }));

    console.log("cccccccccccccccc", dropdownOptions);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [precedence, setPrecedence] = useState("");
    const [active, setActive] = useState("");
    const [category, setCategory] = useState("");
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [precedError, setPrecedError] = useState(false);
    const [activeError, setActiveError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    const nameHandler = (e) => {
        setName(e.target.value);
    };

    const descHandler = (e) => {
        setDescription(e.target.value);
    };

    const roleHandler = (e) => {
        setRole(e.target.value);
    };

    const precedenceHandler = (e) => {
        setPrecedence(e.target.value);
    };

    const activeHandler = (e) => {
        setActive(e.target.value);
    };

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    };

    console.log('name,active,description', name, active, description)

    const categoryValidations = () => {
        const nameValid = /^[a-zA-Z\b]+$/;
        if (category !== "" && category !== null && category !== undefined) {
            setCategoryError(false);

            return true;
        } else {
            setCategoryError(true);
            return false;
        }
    };

    const nameValidations = () => {
        const nameValid = /^[a-zA-Z\b]+$/;
        if (name !== "" && name !== null && name !== undefined) {
            setNameError(false);

            return true;
        } else {
            setNameError(true);
            return false;
        }
    };

    const descValidations = () => {
        const nameValid = /^[a-zA-Z\b]+$/;
        if (
            description !== "" &&
            description !== null &&
            description !== undefined
        ) {
            setDescError(false);

            return true;
        } else {
            setDescError(true);
            return false;
        }
    };

    const roleValidations = () => {
        const nameValid = /^[a-zA-Z\b]+$/;
        if (role !== "" && role !== null && role !== undefined) {
            setRoleError(false);

            return true;
        } else {
            setRoleError(true);
            return false;
        }
    };

    const precedValidations = () => {
        const nameValid = /^[a-zA-Z\b]+$/;
        if (precedence !== "" && precedence !== null && precedence !== undefined) {
            setPrecedError(false);

            return true;
        } else {
            setPrecedError(true);
            return false;
        }
    };

    const activeValidations = () => {
        const nameValid = /^[a-zA-Z\b]+$/;
        if (active !== "" && active !== null && active !== undefined) {
            setActiveError(false);

            return true;
        } else {
            setActiveError(true);
            return false;
        }
    };

    const checkValidations = () => {
        // console.log("isChecked");
        if (
            // (roleValidations() == true) &
            (nameValidations() == true) &
            (descValidations() == true) &
            // (precedValidations() == true) &
            (activeValidations() == true)
            // (categoryValidations() == true)
        ) {
            console.log("inside the if")
            return true;
        } else {
            console.log("inside the else")
            return false;
        }
    };

    const submitHandler = (e) => {
        setIsLoading(true);
        e.preventDefault();
        const value = checkValidations();

        if (value === true) {
            // let data = {
            //     name: name,
            //     description: description,
            //     active: active,
            // };
            // console.log("hello ADD infoData", data);
            const item = [
                {
                    keyName: name,
                    structureType: "ARRAY",
                    displayName: name,
                    description: description,
                    inputType: "string",
                    active: active,
                    readOnly: true,
                    mandatory: true,
                    selectValues: "string",
                    version: 0
                }
            ]
            console.log("dataaaaaa", item)

            dispatch(addmasterAttributeApi(id, item));
            setIsLoading(false);
            classModal();
        }
    };
    return (
        <>
            <div className={styles.add_title}> Add Attribute Set</div>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            type="text"
                            variant="standard"
                            value={name}
                            onChange={nameHandler}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-name"
                            label="Description"
                            type="text"
                            variant="standard"
                            value={description}
                            onChange={descHandler}
                        // multiline
                        // rows={3}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-standard-label">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={active}
                                onChange={activeHandler}
                                label="Status"
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>In-Active</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid
                        container
                        justifyContent="space-around"
                        className={styles.addButton}
                    >
                        <Button onClick={classModal} variant="outlined" color="secondary">
                            CANCEL
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={submitHandler}
                            type="submit"
                            // variant="contained"
                            disabled={isLoading}
                            color="success"
                        >
                            {isLoading ? <CircularProgress size={12} /> : "Submit"}
                        </Button>
                    </Grid>
                </Grid>
                <ToastContainer />
            </form>
        </>
    );
}

export default AddAttributeForm;
