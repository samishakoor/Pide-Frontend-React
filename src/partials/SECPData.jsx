import React, { useState, useEffect } from "react";

function SECPData({ secpData }) {
  const [userId, setUserId] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [director1, setDirector1] = useState("");
  const [director2, setDirector2] = useState("");
  const [director3, setDirector3] = useState("");
  const [secpImages, setSecpImages] = useState([]);

  useEffect(() => {
    setSecpImages(
      Object.values(secpData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );

    setUserId(secpData.userId);
    setDirector1(secpData.director1);
    setDirector2(secpData.director2);
    setDirector3(secpData.director3);
    setOfficeAddress(secpData.officeAddress);
    setTelephoneNumber(secpData.telephoneNumber);
  }, [secpData]);

  return (
    <div>
      {telephoneNumber && <p>Telephone Number: {telephoneNumber}</p>}
      {officeAddress && <p>Office Address: {officeAddress}</p>}
      {director1 && <p>Director 1: {director1}</p>}
      {director2 && <p>Director 2: {director2}</p>}
      {director3 && <p>Director 3: {director3}</p>}

      {secpImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000/images/secp/${userId}/${image}`}
          alt={`Image ${index + 1}`}
          crossOrigin="anonymous"
        />
      ))}
    </div>
  );
}

export default SECPData;
