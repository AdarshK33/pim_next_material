import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { User, LogOut, Users, UserPlus } from "react-feather";
import useUser from "../../utils/useUser";
import fetchJson from "../../utils/fetchJson";

import {userLoginSuccess} from "../../redux/actions/login";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function MyProfile() {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("user?.isLoggedIn",user)

  // const { userEmail,userRole ,userBrand} = useSelector(state => {
   
  //   return state.loginReducer;
  // });


    return (
      <>
         {user?.isLoggedIn === true && (
         <>
        <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic">
                My Profile
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Role: {user.role}</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Email: {user.email}</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1">Brand : {user.brand}</Dropdown.Item> */}
                <Dropdown.Divider />
                <i className="fa fa-user"></i>
                <Dropdown.Item 
                  href="/api/login/logOut"
                  onClick={async (e) => {
                  
                    e.preventDefault();
                    dispatch(userLoginSuccess(0)) ;
                    mutateUser(
                      await fetchJson("/api/login/logOut", { method: "POST" }),
                      false,
                    );
                    router.push("/login");
                   
                  }}
                  >
                      <LogOut /> Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </>
          )} 
      
       </>
    )
}
export default React.memo(MyProfile);