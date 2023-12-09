import React, { useState, useEffect } from "react";

function FBRData({ fbrData }) {
  const [userId, setUserId] = useState("");
  const [natureOfBusiness, setNatureOfBusiness] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [fbrImages, setFbrImages] = useState([]);

  useEffect(() => {
    setFbrImages(
      Object.values(fbrData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );
    setUserId(fbrData.userId);
    setNatureOfBusiness(fbrData.natureOfBusiness);
    setContactNumber(fbrData.contactNumber);
    setEmailAddress(fbrData.emailAddress);
  }, [fbrData]);

  return (
    <div>
      {contactNumber && <p>Contact Number: {contactNumber}</p>}
      {emailAddress && <p>Email Address: {emailAddress}</p>}
      {natureOfBusiness && <p>Nature of Business: {natureOfBusiness}</p>}

      {fbrImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000/images/fbr/${userId}/${image}`}
          alt={`Image ${index + 1}`}
          crossOrigin="anonymous"
        />
      ))}
    </div>
  );
}

export default FBRData;
