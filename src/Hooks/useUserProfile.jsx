import Cookies from "js-cookie";
import { useState } from "react";
import { env } from "../env";

export const useUserProfile = () => {
  
  const SERVER_URL = env.SERVER_URL;

  const getUserProfile = async (username) => {
    const authToken = {
      "auth_token":Cookies.get("auth_token"),
      };
      
    try {
      const response = await fetch(
        `${SERVER_URL}/getUserProfile/${username}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(authToken),

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("respuesta servidor, ", data);
      return data; 
    } catch (error) {
      console.error("Server Error:", error);
      return null; 
    }
  };

  return { getUserProfile };
};