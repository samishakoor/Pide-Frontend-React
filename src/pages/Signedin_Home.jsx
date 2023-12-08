import React, { useState } from "react";
import Signedin_Header from "../partials/signedin_header";
import Sidebar from "../partials/Sidebar";
import Footer from "../partials/Footer";
import MainContent from "../partials/MainContent";

function Signedin_Home() {
  const [mainContent, setMainContent] = useState("Home");

  return (
    <div className="flex flex-col min-h-screen">
      <Signedin_Header />
      <div className="flex flex-1">
        <Sidebar setMainContent={setMainContent} />
        <MainContent content={mainContent} />
      </div>
      <Footer />
    </div>
  );
}

export default Signedin_Home;
