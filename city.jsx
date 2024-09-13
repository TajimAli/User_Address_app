import React, { useState, useEffect } from 'react';

const CityPage = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [cityName, setCityName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries")) || [];
    setCountries(storedCountries);

    const storedStates = JSON.parse(localStorage.getItem("states")) || [];
    setStates(storedStates);

    const storedDistricts = JSON.parse(localStorage.getItem("districts")) || [];
    setDistricts(storedDistricts);

    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(storedCities);
  }, []);

  const saveToLocalStorage = (updatedCities) => {
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState || !selectedDistrict) {
      alert("Please select a country, state, and district");
      return;
    }

    const newCity = {
      country: selectedCountry.toLowerCase(),
      state: selectedState.toLowerCase(),
      district: selectedDistrict.toLowerCase(),
      name: cityName.trim().toLowerCase(),
    };

    // Check for duplicates
    const isDuplicate = cities.some(
      (city) =>
        city.name.toLowerCase() === newCity.name.toLowerCase() &&
        city.country === newCity.country &&
        city.state === newCity.state &&
        city.district === newCity.district
    );

    if (isDuplicate) {
      alert("Duplicate city name in the selected country, state, and district!");
      return;
    }

    if (editIndex !== null) {
      // Editing existing city
      const updatedCities = [...cities];
      updatedCities[editIndex] = newCity;
      setCities(updatedCities);
      saveToLocalStorage(updatedCities);
      setEditIndex(null);
    } else {
      // Adding new city
      const updatedCities = [...cities, newCity];
      setCities(updatedCities);
      saveToLocalStorage(updatedCities);
    }

    setCityName("");
  };

  const handleEdit = (index) => {
    setSelectedCountry(cities[index].country);
    setSelectedState(cities[index].state);
    setSelectedDistrict(cities[index].district);
    setCityName(cities[index].name);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCities = cities.filter((_, i) => i !== index);
    setCities(updatedCities);
    saveToLocalStorage(updatedCities);
  };

  // Filter states based on selected country
  const filteredStates = states.filter(
    (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
  );

  // Filter districts based on selected state
  const filteredDistricts = districts.filter(
    (district) =>
      district.country.toLowerCase() === selectedCountry.toLowerCase() &&
      district.state.toLowerCase() === selectedState.toLowerCase()
  );

  return (
    <div>
      <h2>City Form</h2>
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

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          required
        >
          <option value="">Select District</option>
          {filteredDistricts.map((district, index) => (
            <option key={index} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        />

        <button type="submit">{editIndex !== null ? "Edit" : "Add"} City</button>
      </form>

      <h3>Cities</h3>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={index}>
              <td>{city.country}</td>
              <td>{city.state}</td>
              <td>{city.district}</td>
              <td>{city.name}</td>
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

export default CityPage;
