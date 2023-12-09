import React, { useEffect } from "react";

import BankFormHandler from "./BankFormHandler";
import PSEBFormHandler from "./PSEBFormHandler";
import SECPFormHandler from "./SECPFormHandler";
import FBRFormHandler from "./FBRFormHandler";

function MainContent({ content }) {
  switch (content) {
    case "Home":
      return <div>Main content for Home</div>;
    case "Profile":
      return <div>Main content for Profile</div>;
    case "SECP Registration":
      return <SECPFormHandler />;
    case "FBR Registration":
      return <FBRFormHandler />;
    case "Bank Account Documents":
      return <BankFormHandler />;
    case "PSEB Registration":
      return <PSEBFormHandler />;
    case "Settings":
      return <div>Main content for Settings</div>;
    case "Sign Out":
      return <div>Main content for Sign Out</div>;
    default:
      return <div>No content selected</div>;
  }
}
export default MainContent;
