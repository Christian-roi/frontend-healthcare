import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileBanner from "../components/ProfileBanner";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import categoryService from "../services/category";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const Admin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };
  

  const handleCreateCategory = (e) => {
    e.preventDefault();
    categoryService.create({ name: categoryName }).then(
      (response) => {
        setCategoryName("");
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Category has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content);
      }
    );
  };

    const handleDeleteCategory = (id) => {
        categoryService.remove(id).then(
            (response) => {
                Swal.fire({
                    icon: "success",
                    title: "Category has been deleted",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            },
            (error) => {
                const _content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(_content);
            }
        );
    };

  useEffect(() => {
    categoryService.getAllCategories().then(
      (response) => {
        setCategories(response.data.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content);
      }
    );
  }, []);

  if (!currentUser || currentUser.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <ProfileBanner title="Welcome to Admin Page" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card my-4 border-0 shadow">
              <div className="card-header p-4">
                <h5 className="card-title">Category</h5>
              </div>
              <div className="card-body">
                <Button
                  variant="primary"
                  onClick={handleShow}
                  className="float-start mb-4 ms-2"
                >
                  Add Category <FaPlus />
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Category Name"
                          autoFocus
                          onChange={onChangeCategoryName}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateCategory}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
                <table className="table table-striped table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Category</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={index} className="align-middle">
                        <th scope="row">{index + 1}</th>
                        <td>{category.name}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
