import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCategoryFilter } from '../redux/reducer/postsSlice';
import Navigate from '../components/commons/Navigate';
import BlogCategories from '../components/commons/BlogCategories';

const BlogHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCategoryFilter());
  }, [dispatch]);

  return (
    <Fragment>
      <div style={{ marginTop: "96px" }}></div>
      <Navigate />
      <BlogCategories />
    </Fragment>
  );
};

export default BlogHome;
