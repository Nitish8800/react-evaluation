import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const pages = ["Country", "City"];

const ResponsiveAppBar = () => {
  const [data, setdata] = React.useState(null);

  const handleCloseNavMenu = () => {
    setdata(null);
  };

  return (
    <>
      <div className="container-fluid">
        <Link to="/" className="text-center text-dark py-3 display-2">
          POPULATION LIST
        </Link>
      </div>

      <div className="container-fluid">
        {pages.map((page) => (
          <Link to={`/add-${page}`}>
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              className="text-center text-dark py-3 display-2"
            >
              {page}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};
export default ResponsiveAppBar;
