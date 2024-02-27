import React, { useContext, useEffect, useState } from "react";
import "../css/Homepage.css";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

import { Link } from "react-router-dom";
import Loader from "./Loader";
import { UserDetailsProvider } from "../context/UserDetails";
import UserDetailsContext from "../context/UserDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCarCrash,
  faFrog,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
const Homepage = () => {
  const { loginload, Auth, authfunction, data, userloading,logout } =
    useContext(UserDetailsContext);
  useEffect(() => {
    authfunction();
  }, []);
  return (
    <div className="Homepage">
      {loginload ? (
        <Loader />
      ) : Auth ? (
        <>
          <div className="Home-left">
            <HomeLeft />
          </div>
          <div className="Home-right">{!userloading ? <HomeRight /> : ""}</div>
        </>
      ) : (
        <div className="login-message">
          <div className="icon-con"> </div>
          <Link to="/">
            {data ? "Session Expired" : ""} Click here to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
