import React, { useEffect } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch]);

  return (
    <>
      <h1>latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="red">{error}</ErrorMessage>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
