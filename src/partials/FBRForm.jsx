import React from "react";

const FBRForm = () => {
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
      }
    });

    const textInputFields = document.querySelectorAll("input[type='text']");
    textInputFields.forEach((input) => {
      if (!input.value.trim()) {
        errors[input.name] = "Please enter a value.";
        isValid = false;
      }
    });

    const emailAddress = document.getElementById("emailAddress");
    if (emailAddress && !/\S+@\S+\.\S+/.test(emailAddress.value)) {
      errors["emailAddress"] = "Please enter a valid email address.";
      isValid = false;
    }

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

    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'SECP_Form.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <form className="max-w-4xl mx-auto mt-20 p-8 border rounded shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-6 text-center">FBR Registration Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="cnicCopy" className="block text-gray-700 font-medium mb-1">
            Copy of Valid CNIC (Upload Image)
          </label>
          <input type="file" id="cnicCopy" name="cnicCopy" className="border rounded px-3 py-2 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="electricityBill" className="block text-gray-700 font-medium mb-1">
            Copy of Recently Paid Electricity Bill of Business Location (Upload Image)
          </label>
          <input type="file" id="electricityBill" name="electricityBill" className="border rounded px-3 py-2 w-full" />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="businessLetterHead" className="block text-gray-700 font-medium mb-1">
          Blank Business Letter Head (Upload Image)
        </label>
        <input type="file" id="businessLetterHead" name="businessLetterHead" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="propertyPapers" className="block text-gray-700 font-medium mb-1">
          Property Papers or Rental Agreement (Rental Agreement printed on Rs. 200/- stamp paper) (Upload Image)
        </label>
        <input type="file" id="propertyPapers" name="propertyPapers" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="contactNumbers" className="block text-gray-700 font-medium mb-1">
          Contact Numbers (Landline)
        </label>
        <input type="text" id="contactNumbers" name="contactNumbers" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="emailAddress" className="block text-gray-700 font-medium mb-1">
          Valid Email Address
        </label>
        <input type="text" id="emailAddress" name="emailAddress" className="border rounded px-3 py-2 w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="natureOfBusiness" className="block text-gray-700 font-medium mb-1">
          Nature of Business
        </label>
        <input type="text" id="natureOfBusiness" name="natureOfBusiness" className="border rounded px-3 py-2 w-full" />
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
export default FBRForm;