import React, { useState, useEffect } from 'react';

const StatePage = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);

    const storedStates = JSON.parse(localStorage.getItem("states")) || [];
    setStates(storedStates);
  }, []);

  const saveToLocalStorage = (updatedStates) => {
    localStorage.setItem("states", JSON.stringify(updatedStates));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry) {
      alert("Please select a country");
      return;
    }

    const newState = {
      country: selectedCountry.toLowerCase(),
      name: stateName.trim().toLowerCase(),
      code: stateCode.trim().toLowerCase(),
    };

    const isDuplicate = states.some(
      (state) =>
        (state.name.toLowerCase() === newState.name.toLowerCase() && state.country === newState.country) ||
        (state.code.toLowerCase() === newState.code.toLowerCase() && state.country === newState.country)
    );

    if (isDuplicate) {
      alert("Duplicate state name or code in the selected country!");
      return;
    }

    if (editIndex !== null) {
      const updatedStates = [...states];
      updatedStates[editIndex] = newState;
      setStates(updatedStates);
      saveToLocalStorage(updatedStates);
      setEditIndex(null);
    } else {
      const updatedStates = [...states, newState];
      setStates(updatedStates);
      saveToLocalStorage(updatedStates);
    }

    setStateName("");
    setStateCode("");
  };

  const handleEdit = (index) => {
    setStateName(states[index].name);
    setStateCode(states[index].code);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedStates = states.filter((_, i) => i !== index);
    setStates(updatedStates);
    saveToLocalStorage(updatedStates);
  };

  return (
    <div>
      <h2>State Form</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter state name"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter state code"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          required
        />
        <button type="submit">{editIndex !== null ? "Edit" : "Add"} State</button>
      </form>

      <h3>States</h3>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>State Name</th>
            <th>State Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state, index) => (
            <tr key={index}>
              <td>{state.country}</td>
              <td>{state.name}</td>
              <td>{state.code}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatePage;
