import React, { useState } from "react";

const PSEBForm = () => {
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
      <h2 className="text-lg font-semibold mb-6 text-center">PSEB Registration Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="cnicDirectors" className="block text-gray-700 font-medium mb-1">
            CNIC of Director (Upload Image)
          </label>
          <input type="file" id="cnicDirectors" name="cnicDirectors" className="border rounded px-3 py-2 w-full" />
        </div>
        {/* Add other file input fields similarly */}
        <div className="mb-4">
          <label htmlFor="mouSECP" className="block text-gray-700 font-medium mb-1">
            Attested Copy of M0U (SECP) (Upload Image)
          </label>
          <input type="file" id="mouSECP" name="mouSECP" className="border rounded px-3 py-2 w-full" />
        </div>
         <div className="mb-4">
        <label htmlFor="incorporationCertificate" className="block text-gray-700 font-medium mb-1">
          Incorporation Certificate (SECP) (Upload Image)
        </label>
        <input type="file" id="incorporationCertificate" name="incorporationCertificate" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="partnershipDeed" className="block text-gray-700 font-medium mb-1">
          Partnership Deed (Upload Image)
        </label>
        <input type="file" id="partnershipDeed" name="partnershipDeed" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="firmRegistrationCertificate" className="block text-gray-700 font-medium mb-1">
          Firm Registration Certificate (Upload Image)
        </label>
        <input type="file" id="firmRegistrationCertificate" name="firmRegistrationCertificate" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="feeChallanPSEB" className="block text-gray-700 font-medium mb-1">
          Fee Challan (Upload Image)
        </label>
        <input type="file" id="feeChallanPSEB" name="feeChallanPSEB" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="businessBankStatement" className="block text-gray-700 font-medium mb-1">
          Business Bank Statement (Upload Image)
        </label>
        <input type="file" id="businessBankStatement" name="businessBankStatement" className="border rounded px-3 py-2 w-full" />
              </div>
              </div>
     
       

      
      {Object.keys(formErrors).map((fieldName, index) => {
        return (
          <div key={index} className="text-red-500">
            {formErrors[fieldName]}
          </div>
        );
      })}

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

export default PSEBForm;
