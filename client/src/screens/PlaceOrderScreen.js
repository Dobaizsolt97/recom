import React, { useEffect } from "react";
import { createOrder } from "../actions/orderActions";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import CheckoutComponent from "../components/CheckoutComponent";
import { Link } from "react-router-dom";

const PlaceOrderScreen = ({ history }) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAdress: cart.shippingAdress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  //calculate prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
  );
  //calculate shipping
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  //calculate tax
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  //calculate total
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  return (
    <>
      <CheckoutComponent step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Adress:</strong>
              </p>
              {cart.shippingAdress.adress},{cart.shippingAdress.city},{" "}
              {cart.shippingAdress.postalCode},{cart.shippingAdress.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <ErrorMessage>Your cart is empty</ErrorMessage>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={2}>
                          <Image
                            fluid
                            rounded
                            src={item.image}
                            alt={item.name}
                          ></Image>
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total price</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <ListGroupItem>
                    {" "}
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                  </ListGroupItem>
                )}

                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
