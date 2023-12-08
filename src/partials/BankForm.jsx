
import React, { useState } from "react";

const BankForm = () => {
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

    // Check text input fields for any empty values
    const textInputFields = document.querySelectorAll("input[type='text']");
    textInputFields.forEach((input) => {
      if (!input.value.trim()) {
        errors[input.name] = "Please enter a value.";
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
      <h2 className="text-lg font-semibold mb-6 text-center">Bank Registration Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="cnicCopy" className="block text-gray-700 font-medium mb-1">
            CNIC Copy(Upload Image)
          </label>
          <input type="file" id="cnicCopy" name="cnicCopy" className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="nationalTaxProof" className="block text-gray-700 font-medium mb-1">
            Proof of National Tax Number (Upload Image)
          </label>
          <input type="file" id="nationalTaxProof" name="nationalTaxProof" className="border rounded px-3 py-2 w-full" />
            
            
              </div>
              
         <div className="mb-4">
        <label htmlFor="letterHeadSample" className="block text-gray-700 font-medium mb-1">
          Letter Head Sample (Upload Image)
        </label>
        <input type="file" id="letterHeadSample" name="letterHeadSample" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="rubberStampSample" className="block text-gray-700 font-medium mb-1">
          Rubber Stamp Sample (Upload Image)
        </label>
        <input type="file" id="rubberStampSample" name="rubberStampSample" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="partnershipDeedCopy" className="block text-gray-700 font-medium mb-1">
          Copy of the Partnership Deed (Upload Image)
        </label>
        <input type="file" id="partnershipDeedCopy" name="partnershipDeedCopy" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="secpRegistrationCopy" className="block text-gray-700 font-medium mb-1">
          SECP Registration/Certificate of Registration Copy (Upload Image)
        </label>
        <input type="file" id="secpRegistrationCopy" name="secpRegistrationCopy" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="businessAddressProof" className="block text-gray-700 font-medium mb-1">
          Proof of Business Address (Upload Image)
        </label>
        <input type="file" id="businessAddressProof" name="businessAddressProof" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="affidavitCopy" className="block text-gray-700 font-medium mb-1">
          Affidavit (Upload Image)
        </label>
        <input type="file" id="affidavitCopy" name="affidavitCopy" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="articlesMemorandumCopy" className="block text-gray-700 font-medium mb-1">
          Memorandum of Articles/Association (Upload Image)
        </label>
        <input type="file" id="articlesMemorandumCopy" name="articlesMemorandumCopy" className="border rounded px-3 py-2 w-full" />
              </div>
              </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mb-4">
          <label htmlFor="director1" className="block text-gray-700 font-medium mb-1">
            Director 1
          </label>
          <input type="text" id="director1" name="director1" className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="director2" className="block text-gray-700 font-medium mb-1">
            Director 2
          </label>
          <input type="text" id="director2" name="director2" className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="director3" className="block text-gray-700 font-medium mb-1">
            Director 3
          </label>
          <input type="text" id="director3" name="director3" className="border rounded px-3 py-2 w-full" />
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

export default BankForm;