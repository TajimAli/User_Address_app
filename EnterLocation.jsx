import React, { useState, useEffect } from 'react';

const FullAddressPage = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [addressDetails, setAddressDetails] = useState("");
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

    const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(storedAddresses);
  }, []);

  const saveToLocalStorage = (updatedAddresses) => {
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCountry || !selectedState || !selectedDistrict || !selectedCity || !addressDetails) {
      alert("Please complete all fields");
      return;
    }

    const newAddress = {
      country: selectedCountry.toLowerCase(),
      state: selectedState.toLowerCase(),
      district: selectedDistrict.toLowerCase(),
      city: selectedCity.toLowerCase(),
      details: addressDetails.trim().toLowerCase(),
    };

    // Check for duplicates
    const isDuplicate = addresses.some(
      (address) =>
        address.country === newAddress.country &&
        address.state === newAddress.state &&
        address.district === newAddress.district &&
        address.city === newAddress.city &&
        address.details === newAddress.details
    );

    if (isDuplicate) {
      alert("This address already exists!");
      return;
    }

    if (editIndex !== null) {
      // Editing existing address
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = newAddress;
      setAddresses(updatedAddresses);
      saveToLocalStorage(updatedAddresses);
      setEditIndex(null);
    } else {
      // Adding new address
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      saveToLocalStorage(updatedAddresses);
    }

    // Reset the form
    setSelectedCountry("");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCity("");
    setAddressDetails("");
  };

  const handleEdit = (index) => {
    setSelectedCountry(addresses[index].country);
    setSelectedState(addresses[index].state);
    setSelectedDistrict(addresses[index].district);
    setSelectedCity(addresses[index].city);
    setAddressDetails(addresses[index].details);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    saveToLocalStorage(updatedAddresses);
  };

  const filteredStates = states.filter(
    (state) => state.country.toLowerCase() === selectedCountry.toLowerCase()
  );

  const filteredDistricts = districts.filter(
    (district) =>
      district.country.toLowerCase() === selectedCountry.toLowerCase() &&
      district.state.toLowerCase() === selectedState.toLowerCase()
  );

  const filteredCities = cities.filter(
    (city) =>
      city.country.toLowerCase() === selectedCountry.toLowerCase() &&
      city.state.toLowerCase() === selectedState.toLowerCase() &&
      city.district.toLowerCase() === selectedDistrict.toLowerCase()
  );

  return (
    <div>
      <h2>Full Address Form</h2>
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

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          required
        >
          <option value="">Select City</option>
          {filteredCities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter full address details"
          value={addressDetails}
          onChange={(e) => setAddressDetails(e.target.value)}
          required
        />

        <button type="submit">{editIndex !== null ? "Edit" : "Add"} Address</button>
      </form>

      <h3>Stored Addresses</h3>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>City</th>
            <th>Address Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={index}>
              <td>{address.country}</td>
              <td>{address.state}</td>
              <td>{address.district}</td>
              <td>{address.city}</td>
              <td>{address.details}</td>
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

export default FullAddressPage;
