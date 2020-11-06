import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant, children }) => (
  <Alert variant={variant}>{children}</Alert>
);

export default ErrorMessage;

ErrorMessage.defaultProps = {
  variant: "info",
};
