import React, { useState, useEffect } from 'react';

const DistrictPage = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);

    const storedStates = JSON.parse(localStorage.getItem("states")) || [];
    setStates(storedStates);

    const storedDistricts = JSON.parse(localStorage.getItem("districts")) || [];
    setDistricts(storedDistricts);
  }, []);

  const saveToLocalStorage = (updatedDistricts) => {
    localStorage.setItem("districts", JSON.stringify(updatedDistricts));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState) {
      alert("Please select a country and state");
      return;
    }

    const newDistrict = {
      country: selectedCountry.toLowerCase(),
      state: selectedState.toLowerCase(),
      name: districtName.trim().toLowerCase(),
    };

    // Check for duplicates
    const isDuplicate = districts.some(
      (district) =>
        district.name.toLowerCase() === newDistrict.name.toLowerCase() &&
        district.country === newDistrict.country &&
        district.state === newDistrict.state
    );

    if (isDuplicate) {
      alert("Duplicate district name in the selected country and state!");
      return;
    }

    if (editIndex !== null) {
      // Editing existing district
      const updatedDistricts = [...districts];
      updatedDistricts[editIndex] = newDistrict;
      setDistricts(updatedDistricts);
      saveToLocalStorage(updatedDistricts);
      setEditIndex(null);
    } else {
      // Adding new district
      const updatedDistricts = [...districts, newDistrict];
      setDistricts(updatedDistricts);
      saveToLocalStorage(updatedDistricts);
    }

    setDistrictName("");
  };

  const handleEdit = (index) => {
    setSelectedCountry(districts[index].country);
    setSelectedState(districts[index].state);
    setDistrictName(districts[index].name);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDistricts = districts.filter((_, i) => i !== index);
    setDistricts(updatedDistricts);
    saveToLocalStorage(updatedDistricts);
  };

  const filteredStates = states.filter(
    (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
  );

  return (
    <div>
      <h2>District Form</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          required
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          required
        >
          <option value="">Select State</option>
          {filteredStates.map((state, index) => (
            <option key={index} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter district name"
          value={districtName}
          onChange={(e) => setDistrictName(e.target.value)}
          required
        />

        <button type="submit">{editIndex !== null ? "Edit" : "Add"} District</button>
      </form>

      <h3>Districts</h3>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district, index) => (
            <tr key={index}>
              <td>{district.country}</td>
              <td>{district.state}</td>
              <td>{district.name}</td>
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

export default DistrictPage;
