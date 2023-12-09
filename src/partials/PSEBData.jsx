import React, { useState, useEffect } from "react";

function PSEBData({ psebData }) {
  const [userId, setUserId] = useState("");
  const [psebImages, setPsebImages] = useState([]);

  useEffect(() => {
    setPsebImages(
      Object.values(psebData)
        .map((entity) => entity.fileName)
        .filter((fileName) => fileName !== undefined)
    );
    setUserId(psebData.userId);
  }, [psebData]);

  return (
    <div>
      {psebImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000/images/pseb/${userId}/${image}`}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default PSEBData;
