import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ECOM",
  keywords: "electronics, buy electronics, cheap electronics",
  description: "Best products at the lowest price",
};

export default Meta;
