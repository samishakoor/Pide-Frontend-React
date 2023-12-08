import React, { useState } from "react";

const SECPForm = () => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    const inputFields = document.querySelectorAll("input[type='file']");
    inputFields.forEach((input) => {
      const files = input.files;
      if (!files || files.length === 0) {
        errors[input.name] = "Please upload a file.";
        isValid = false;
      } else {
        for (let i = 0; i < files.length; i++) {
          const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
          if (!allowedExtensions.exec(files[i].name)) {
            errors[input.name] = "Only JPG, JPEG, or PNG files are allowed.";
            isValid = false;
            break;
          }
        }
      }
    });

    const textInputFields = document.querySelectorAll("input[type='text']");
    textInputFields.forEach((input) => {
      if (!input.value.trim()) {
        errors[input.name] = "Please enter a value.";
        isValid = false;
      } else if (input.name === 'telephoneNumber' && !/^\d+$/.test(input.value.trim())) {
        errors[input.name] = "Please enter a valid telephone number (numbers only).";
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    const formData = new FormData(event.target);

    const base64Promises = [];
    for (const file of formData.values()) {
      if (file instanceof File) {
        const reader = new FileReader();
        base64Promises.push(
          new Promise((resolve) => {
            reader.onload = () => {
              resolve(reader.result);
            };
          })
        );
        reader.readAsDataURL(file);
      }
    }

    const base64Results = await Promise.all(base64Promises);

    const fileInputs = Array.from(formData.entries()).reduce((acc, [key, value], index) => {
      if (value instanceof File) {
        acc[key] = {
          name: value.name,
          type: value.type,
          data: base64Results[index],
        };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    const jsonData = JSON.stringify(fileInputs, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "SECP_Form.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form className="max-w-4xl mx-auto mt-20 p-8 border rounded shadow-md bg-white" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6">SECP Registration Form</h2>

      <div className="mb-4">
        <label htmlFor="cnic" className="block text-gray-700 font-medium mb-2">
          CNIC (Upload Image)
        </label>
        <input type="file" id="cnic" name="cnic" className="border rounded px-4 py-2 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="memorandum" className="block text-gray-700 font-medium mb-2">
            Memorandum (Upload Image)
          </label>
          <input
            type="file"
            id="memorandum"
            name="memorandum"
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="complianceForm" className="block text-gray-700 font-medium mb-2">
            Compliance Form (Upload Image)
          </label>
          <input
            type="file"
            id="complianceForm"
            name="complianceForm"
            className="border rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="officeAddress" className="block text-gray-700 font-medium mb-2">
            Office Address
          </label>
          <input
            type="text"
            id="officeAddress"
            name="officeAddress"
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter Office Address"
          />
        </div>
        <div>
          <label htmlFor="telephoneNumber" className="block text-gray-700 font-medium mb-2">
            Telephone Number
          </label>
          <input
            type="text"
            id="telephoneNumber"
            name="telephoneNumber"
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter Telephone Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="director1" className="block text-gray-700 font-medium mb-2">
            Name of Director 1
          </label>
          <input
            type="text"
            id="director1"
            name="director1"
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter Director 1 Name"
          />
        </div>
        <div>
          <label htmlFor="director2" className="block text-gray-700 font-medium mb-2">
            Name of Director 2
          </label>
          <input
            type="text"
            id="director2"
            name="director2"
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter Director 2 Name"
          />
        </div>
        <div>
          <label htmlFor="director3" className="block text-gray-700 font-medium mb-2">
            Name of Director 3
          </label>
          <input
            type="text"
            id="director3"
            name="director3"
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter Director 3 Name"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="feeChallan" className="block text-gray-700 font-medium mb-2">
          Fee Challan (Upload Image)
        </label>
        <input
          type="file"
          id="feeChallan"
          name="feeChallan"
          className="border rounded px-4 py-2 w-full"
        />
      </div>



      {Object.keys(formErrors).length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded focus:outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SECPForm;
