import React, { useEffect } from "react";
import SECPForm from "./SECPForm";
import FBRForm from "./FBRForm";
import BankForm from "./BankForm";
import PSEBForm from "./PSEBForm";
function MainContent({ content }) {
  

  switch (content) {
    case "Home":
      return <div>Main content for Home</div>;
    case "Profile":
      return <div>Main content for Profile</div>;
    case "SECP Registration":
      return SECPForm(); // Display SECP Registration form
    case "FBR Registration":
      return FBRForm();
    case "Bank Account Documents":
      return BankForm();
    case "PSEB Registration":
      return PSEBForm();
    case "Settings":
      return <div>Main content for Settings</div>;
    case "Sign Out":
      return <div>Main content for Sign Out</div>;
    default:
      return <div>No content selected</div>;
  }
}
export default MainContent;
