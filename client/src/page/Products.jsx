import React, { Fragment, useEffect, useState } from "react";
import Navigate from "../components/commons/Navigate";
import ListProducts from "../components/commons/ListProducts";


const Products = () => {

  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Lấy các tham số từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const colorsFromQuery = [];

    // Duyệt qua các tham số và lấy các màu
    for (let [key, value] of queryParams.entries()) {
      if (key.startsWith('color')) {
        colorsFromQuery.push(value);
      }
    }

    setColors(colorsFromQuery);
  }, []);
  console.log(colors);

  return (
    <Fragment>
      <div style={{ marginTop: "152px" }}></div>
      <Navigate></Navigate>
      <ListProducts></ListProducts>
    </Fragment>
  );
};

export default Products;
