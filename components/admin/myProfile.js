import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { User, LogOut, Users, UserPlus } from "react-feather";

function MyProfile() {

    return (
      <>
        <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic">
                My Profile
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Degination</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Branch</Dropdown.Item>
                <Dropdown.Divider />
                <i className="fa fa-user"></i>
                <Dropdown.Item href="/">  <LogOut /> Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

       </>
    )
}
export default React.memo(MyProfile);