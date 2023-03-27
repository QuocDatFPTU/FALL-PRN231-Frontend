import axiosClient from "api/axiosClient";
import React, { useEffect } from "react";
import MyRouter from "routers/index";

function App() {
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (storedToken) {
      // Set the token in the header
      axiosClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }
  }, []);

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
