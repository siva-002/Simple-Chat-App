import React, { useContext, useEffect, useState } from "react";
import "../css/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faMessage,
  faSignOut,
  faSignOutAlt,
  faUserFriends,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserDetailsContext from "../context/UserDetails";
import img from "./image/profile.png";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import UserMessages from "./UserMessages";
const HomeLeft = () => {
  const { data, error,sorted, userloading, user ,setupdatedata,updatedata,handleformupdate,
    updateload,imgfile,fileupload,newmsgs,logout} = useContext(UserDetailsContext);
  const [search, setsearch] = useState("");

  return (
    <div>
      <div className="user-info">
        <Link to="/user">
          <span> {data.name}</span>
        </Link>
        <Link to="/">
          <span> <FontAwesomeIcon  icon={faSignOutAlt} onClick={logout}/></span>
        </Link>
      </div>
      <div className="nav nav-tabs" id="tab" role="tablist">
        <button
          className="nav-link active"
          id=""
          data-bs-toggle="tab"
          data-bs-target="#home"
        >
       
          <FontAwesomeIcon icon={faMessage} /> Chats
        </button>
        <button
          className="nav-link"
          id=""
          data-bs-toggle="tab"
          data-bs-target="#users"
        >
         
          <FontAwesomeIcon icon={faUserFriends} /> Users
        </button>
        <button
          className="nav-link"
          id=""
          data-bs-toggle="tab"
          data-bs-target="#profile"
        >
          {" "}
          <FontAwesomeIcon icon={faGear} /> Profile
        </button>
      </div>

      <div className="tab-content" id="">
        <div className="tab-pane fade show active" id="home">
          <Searchbar setsearch={setsearch} />
          <UserMessages
            img={img}
            data={data}
            search={search}
            userdata={sorted}
            userloading={userloading}
          newmsgs={newmsgs}
          />
        </div>
        <div className="tab-pane fade  " id="users">
          <Searchbar setsearch={setsearch} />
          <UserMessages
            img={img}
            data={data}
            search={search}
            userdata={user}
            userloading={userloading}
          />
        </div>
        <div className="tab-pane fade" id="profile">
          <Profile data={data} img={img} setupdatedata={setupdatedata} handleformupdate={handleformupdate}
          updatedata={updatedata} updateload={updateload}
          imgfile={imgfile} fileupload={fileupload} error={error} 
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
