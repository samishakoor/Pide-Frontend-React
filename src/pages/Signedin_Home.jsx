import React, { useState, useEffect } from "react";
import Signedin_Header from "../partials/signedin_header";
import Sidebar from "../partials/Sidebar";
import axios from "axios";
import Footer from "../partials/Footer";
import MainContent from "../partials/MainContent";

function Signedin_Home() {
  const [mainContent, setMainContent] = useState("Home");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/users/userData",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem("token")
              )}`,
            },
          }
        );

        if (response.statusCode === 401) {
          alert("Token expired, Please Login Again !");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        } else {
          if (response.status === 200) {
            setUserData(response.data.data.user);
          } else {
            alert("Something went wrong");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Something went wrong");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Signedin_Header userData={userData} />
      <div className="flex flex-1">
        <Sidebar setMainContent={setMainContent} />
        <MainContent content={mainContent} />
      </div>
      <Footer />
    </div>
  );
}

export default Signedin_Home;
