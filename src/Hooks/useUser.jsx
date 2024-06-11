import Cookies from "js-cookie";
import { useState } from "react";
import { env } from "../env";

export const useUser = () => {
  const SERVER_URL = env.SERVER_URL;



  const getUser = async () => {

    const authToken = {
      "auth_token":Cookies.get("auth_token"),
    };
    
    console.log("cookie",authToken)


    try {

      const response = await fetch(`${SERVER_URL}/getUser/`, {
        method: "POST",
        credentials: 'include',
      body: JSON.stringify(authToken),

        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("respuesta servidorrr, ", data);
      return data; 
    } catch (error) {
      console.error("Server Error:", error);
      return null; 
    }
  };

  return { getUser };
};

