import React, { Fragment } from "react";
import Navigate from "../components/commons/Navigate";
import ListProducts from "../components/commons/ListProducts";


const Products = () => {
  
  return (
    <Fragment>
        <div style={{ marginTop: "96px" }}></div>
        <Navigate></Navigate>
        <ListProducts></ListProducts>
    </Fragment>
  );
}; 

export default Products;
