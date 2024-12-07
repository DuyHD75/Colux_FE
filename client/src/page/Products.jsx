import React, { Fragment, useEffect, useState } from "react";
import Navigate from "../components/commons/Navigate";
import ListProducts from "../components/commons/ListProducts";
import productsApi from "../api/modules/products.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSearchColors } from "../redux/reducer/colorFamiliesSlice";

const Products = () => {

  const [colors, setColors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Lấy các tham số từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const colorsFromQuery = [];
    let valueArray='';
    const colorArray = [];
    // Duyệt qua các tham số và lấy các màu
    for (let [key, value] of queryParams.entries()) {
      if (key.startsWith('color')) {
        // Loại bỏ dấu # đầu mỗi value
        valueArray=value
        colorArray.push(valueArray);
        value = value.startsWith('#') ? value.slice(1) : value;
        colorsFromQuery.push(value);
      }
    }
    console.log('colorArray',colorArray);

    dispatch(setSearchColors(colorArray));
    const colorString = colorsFromQuery.join(',');
    setColors(colorString);
  }, []);

  console.log(colors);


  useEffect(() => {
    const searchMultipleColors = async () => {
      if (colors.length > 0) {
        try {
          const { response, err } = await productsApi.searchMulti(
            colors
          );
          if (response) {
            setSearchResults(response.data.Results);
            toast.success("Search products successfully.");
          } else if (err) {
            toast.error(err);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    }
    searchMultipleColors();
  }, [colors]);
  console.log(searchResults);

  return (
    <Fragment>
      <div style={{ marginTop: "152px" }}></div>
      <Navigate></Navigate>
      <ListProducts products={searchResults} ></ListProducts>
    </Fragment>
  );
};

export default Products;
