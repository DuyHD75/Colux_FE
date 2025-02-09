import React, { Fragment } from "react";
import Banner from "../components/commons/Banner";
import Navigate from "../components/commons/Navigate";
import HomeColorFamilies from "../components/commons/HomeColorFamilies";
import Blogs from "../components/commons/Blogs";
import ProductCarousel from "../components/commons/ProductCarousel";
import AdvisoryBanner from "../components/commons/AdvisoryBanner";
import ProjectConstructed from "../components/commons/ProjectConstructed";
import ContactForm from "../components/commons/ContactForm";
const Home = () => {
  return (
    <Fragment>
      <Banner></Banner>
      <Navigate></Navigate>
      <HomeColorFamilies></HomeColorFamilies>
      {/* <Blogs></Blogs> */}
      <ProductCarousel></ProductCarousel>
      <AdvisoryBanner></AdvisoryBanner>
      <ProjectConstructed></ProjectConstructed>
      <ContactForm></ContactForm>
    </Fragment>
  );
};

export default Home;
