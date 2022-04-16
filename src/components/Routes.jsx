import { Routes as ROUTES, Route } from "react-router-dom";
import React from "react";
import { Home } from "./Home";
import ResponsiveAppBar from "./Navbar";
import { Country } from "./Country";
import { City } from "./City";
import { EditCity } from "./EditCity";
import { NotFound } from "./NotFound";

export const Routes = () => {
  return (
    <>
      <ResponsiveAppBar />
      <ROUTES>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-country" element={<Country />} />
        <Route path="/add-city" element={<City />} />
        <Route path="/add-city/:id" element={<EditCity />} />
        <Route path="*" element={<NotFound />} />
      </ROUTES>
    </>
  );
};
