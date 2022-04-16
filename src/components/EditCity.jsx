import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";

export const EditCity = () => {
  const [Countries, setCountries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3100/country").then((el) => {
      setCountries([...el.data]);
    });

    axios.get(`http://localhost:3100/city/${id}`).then((el) => {
      setCity({ ...el.data });
    });
  }, []);

  const [City, setCity] = useState({
    country: "",
    city: "",
    population: "",
  });

  const handleChange = (el) => {
    setCity({
      ...City,
      [el.target.name]: el.target.value,
    });
  };

  const handleSubmit = (res) => {
    res.preventDefault();
    axios.put(`http://localhost:3100/city/${id}`, City).then((el) => {
      setCity({
        country: "",
        city: "",
        population: "",
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>City</label>
        <input
          value={City.city}
          onChange={handleChange}
          name="city"
          type="text"
        />

        <label>Country</label>
        <select onChange={handleChange} name="country">
          <option>Select Country</option>

          {Countries.map((el, index) => {
            return (
              <option key={index} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>

        <label>Population</label>
        <input
          value={City.population}
          onChange={handleChange}
          name="population"
          type="Number"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
