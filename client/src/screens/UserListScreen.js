import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: deleteSuccess, error: deleteError } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, deleteSuccess]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) dispatch(deleteUser(id));
  };
  return (
    <>
      <h1>Users</h1>
      {deleteSuccess && (
        <ErrorMessage variant="success">User deleted</ErrorMessage>
      )}
      {deleteError && (
        <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <Table striped bordered hover responsive className="table=sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => deleteHandler(user._id)}
                    className="btn-sm"
                    variant="danger"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
