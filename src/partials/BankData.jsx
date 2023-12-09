import React, { useState, useEffect } from "react";

function BankData({ bankData }) {
  const [userId, setUserId] = useState("");
  const [director1, setDirector1] = useState("");
  const [director2, setDirector2] = useState("");
  const [director3, setDirector3] = useState("");
  const [bankImages, setBankImages] = useState([]);

  useEffect(() => {
    setBankImages(
      Object.values(bankData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );
    setUserId(bankData.userId);
    setDirector1(bankData.director1);
    setDirector2(bankData.director2);
    setDirector3(bankData.director3);
  }, [bankData]);

  return (
    <div>
      {director1 && <p>Director 1: {director1}</p>}
      {director2 && <p>Director 2: {director2}</p>}
      {director3 && <p>Director 3: {director3}</p>}

      {bankImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000/images/bank/${userId}/${image}`}
          alt={`Image ${index + 1}`}
          crossOrigin="anonymous"
        />
      ))}
    </div>
  );
}

export default BankData;
