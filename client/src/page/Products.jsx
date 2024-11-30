import React, { Fragment, useEffect, useState } from "react";
import Navigate from "../components/commons/Navigate";
import ListProducts from "../components/commons/ListProducts";
import { setSearchColors } from "../redux/reducer/colorFamiliesSlice";
import { useDispatch } from "react-redux";

const Products = () => {

  const [colors, setColors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy các tham số từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const colorsFromQuery = [];

    // Duyệt qua các tham số và lấy các màu
    for (let [key, value] of queryParams.entries()) {
      if (key.startsWith('color')) {
        // Loại bỏ dấu # đầu mỗi value
        value = value.startsWith('#') ? value.slice(1) : value;
        colorsFromQuery.push(value);
      }
    }
    const colorString = colorsFromQuery.join(',');
    dispatch(setSearchColors(colorString));
    setColors(colorString);
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
