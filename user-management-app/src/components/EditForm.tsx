import { useState } from "react";
import TextInput from "./TextInput";

interface formData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  gender: "male" | "female";
  address: {
    state: string;
  };
}

interface EditFormProps {
  selectedUser: formData;
  closeModal: () => void;
}

const STATES = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const EditForm = ({ selectedUser, closeModal }: EditFormProps) => {
  const [formData, setFormData] = useState<formData>({
    id: selectedUser.id,
    firstName: selectedUser.firstName,
    lastName: selectedUser.lastName,
    email: selectedUser.email,
    birthDate: selectedUser.birthDate,
    gender: selectedUser.gender,
    address: {
      state: selectedUser.address.state,
    },
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const getUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "state") {
      return setFormData({ ...formData, address: { state: e.target.value } });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(
        `https://dummyjson.com/users/${formData.id}`,
        requestOptions
      );
      const data = await response.json();
      if (data.status === "error") {
        throw new Error(data.message);
      }
      setIsUpdating(false);
      alert("Update Successful!");
      closeModal();
    } catch (e) {
      alert("Unable to update user. Please try again");
    }
  };
  return (
    <form onSubmit={submitUserUpdate} className="space-y-4">
      <TextInput
        id="firstName"
        type="text"
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={getUserInput}
      />
      <TextInput
        id="lastName"
        type="text"
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={getUserInput}
      />
      <TextInput
        id="email"
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={getUserInput}
      />
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          id="birthDate"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={getUserInput}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">Gender</legend>
        <div className="flex items-center">
          <input
            id="male"
            type="radio"
            name="gender"
            value="male"
            onChange={getUserInput}
            checked={formData.gender === "male"}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label
            htmlFor="male"
            className="ml-3 block text-sm font-medium text-gray-700"
          >
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="female"
            type="radio"
            name="gender"
            value="female"
            onChange={getUserInput}
            checked={formData.gender === "female"}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label
            htmlFor="female"
            className="ml-3 block text-sm font-medium text-gray-700"
          >
            Female
          </label>
        </div>
      </fieldset>
      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700"
        >
          Address State
        </label>
        <select
          id="state"
          name="state"
          value={formData.address.state}
          onChange={getUserInput}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
      {isUpdating && (
        <p className="text-sm text-gray-500">Processing your request...</p>
      )}
    </form>
  );
};

export default EditForm;
