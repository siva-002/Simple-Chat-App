import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Getmessage, Gettime } from "./Gettime";
import { imgpath } from "../Api/Link";
import Newmessagecount from "./Newmessagecount";
const UserMessages = ({ search, data, img, userdata, userloading,newmsgs}) => {



  return (
    <div className="usermessages">
      {userloading ? (
        <span className="nousers">Loading chats...</span>
      ) : (
        (!userloading && !userdata.length)?<span className="nousers">No chats found...</span>:
        userdata
          .filter(
            (user) =>
              user._id != data._id &&
              user.name.toUpperCase().includes(search.toUpperCase())
          )
          .map((user) => (
            <Link to={`/user/${user._id}`} key={user._id}>
              <div className="user">
                <span className="user-icon">
                
                  <img src={user.profilepic?`${imgpath()}/${user._id}/${user.profilepic}`: img } />{" "}
                </span>
                <div className="user-detail">
                  <span className="user-name">{user.name}</span>

                  {user.type ? (
                    <span className="user-msg">
                     
                      <span className={user.type}>{Getmessage(user)}</span>
                      <span className="new-msg">{Newmessagecount(user._id,newmsgs)}</span>
                      <span className="last-msg-time">{Gettime(user)}</span>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>{" "}
            </Link>
          ))
      )}
    </div>
  );
};

export default UserMessages;
