import React, { useState, useEffect } from 'react';

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);
  }, []);

  const saveToLocalStorage = (updatedCountries) => {
    localStorage.setItem("countries", JSON.stringify(updatedCountries));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCountry = {
      name: countryName.trim().toLowerCase(),
      code: countryCode.trim().toLowerCase(),
    };

    // Check for duplicates
    const isDuplicate = countries.some(
      (country) =>
        country.name.toLowerCase() === newCountry.name.toLowerCase() ||
        country.code.toLowerCase() === newCountry.code.toLowerCase()
    );

    if (isDuplicate) {
      alert("Duplicate country name or code!");
      return;
    }

    if (editIndex !== null) {
      // Editing existing country
      const updatedCountries = [...countries];
      updatedCountries[editIndex] = newCountry;
      setCountries(updatedCountries);
      saveToLocalStorage(updatedCountries);
      setEditIndex(null);
    } else {
      // Adding new country
      const updatedCountries = [...countries, newCountry];
      setCountries(updatedCountries);
      saveToLocalStorage(updatedCountries);
    }

    setCountryName("");
    setCountryCode("");
  };

  const handleEdit = (index) => {
    setCountryName(countries[index].name);
    setCountryCode(countries[index].code);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCountries = countries.filter((_, i) => i !== index);
    setCountries(updatedCountries);
    saveToLocalStorage(updatedCountries);
  };

  return (
    <div>
      <h2>Country Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter country name"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter country code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
        />
        <button type="submit">{editIndex !== null ? "Edit" : "Add"} Country</button>
      </form>

      <h3>Countries</h3>
      <table>
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{country.name}</td>
              <td>{country.code}</td>
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

export default CountryPage;
