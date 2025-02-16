import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: reviewSuccess, error: reviewError } = productCreateReview;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (reviewSuccess) {
      alert("Review submitted");
      setRating(0);
      setComment(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(match.params.id));
  }, [match.params.id, dispatch, reviewSuccess]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            onChange={(e) => setQty(e.target.value)}
                            value={qty}
                            as="select"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock < 1}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <ErrorMessage>No reviews</ErrorMessage>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((rev) => (
                  <ListGroup.Item key={rev._id}>
                    <strong>{rev.name}</strong>
                    <Rating value={rev.rating} />
                    <p>{rev.createdAt.substring(0, 10)}</p>
                    <p>{rev.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {reviewError && (
                    <ErrorMessage variant="danger">{reviewError}</ErrorMessage>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </FormGroup>
                      <FormGroup controlid="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          row="3"
                          value={comment}
                          as="textarea"
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </FormGroup>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <ErrorMessage>
                      Please <Link to="/login">Log in</Link> to write a review
                    </ErrorMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
