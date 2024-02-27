import React from "react";
import { decryptdata } from "./EncryptionandDecryption";
const Gettime = (user) => {
  const time = user.time.toString().substring(16, 21);
  const meridian = time.substring(0, 2) >= 12 ? "P.M" : "A.M";
  return (
    <>
      {time} <sub>{meridian}</sub>
    </>
  );
};
const Getmessage = (user) => {
  const msg = decryptdata(user.lastmsg);
  const format = msg.length > 5 ? msg.substring(0, 6) + "..." : msg;
  return format;
};

export { Gettime, Getmessage };
