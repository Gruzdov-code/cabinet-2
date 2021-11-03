import React, { useState, useEffect } from "react";
import { getTokenInit } from "../../firebaseInit";


const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getTokenInit(setTokenFound);
      if (data) {
        console.log("Token is", data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
