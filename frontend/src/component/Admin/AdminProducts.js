import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import Loader from "../layout/Loader/Loader";
import { Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/userAction";
import {
  DELETE_PRODUCT_RESET,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../constants/productConstants";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../actions/productAction";
import { GrLike } from "react-icons/gr";
import MetaData from "../layout/MetaData";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import Pagination from "react-js-pagination";
import "./Admin.css";

export default function AdminProducts() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, products, loading, productsCount, itemsPerPage } = useSelector(
    (state) => state.allproducts
  );

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    error: deleteError,
    error: updateError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error: createError, success } = useSelector(
    (state) => state.newProduct
  );

  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
    setOpenAlertSuccess(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const [className, setClassName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [productId, setproductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Vegetables and Fruit",
    "Beverages",
    "Meats and Seafood",
    "Breakfast and Dairy",
    "Frozen Foods",
    "Biscuits and Snacks",
    "Grocery and Staples",
    "Wines and Alcohol Drinks",
    "Milk and Dairies",
    "Pet Foods",
  ];

  const addProduct = (e) => {
    e.preventDefault();
    setClassName("addProduct");
    setImagesPreview([]);
    setproductId("");
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setStock(0);
    setOldImages([]);
  };

  const handleSetProduct = (id, name, des, price, cate, stock, img) => {
    if (className === "deleteProduct") {
      setproductId(id);
    } else {
      setImagesPreview([]);
      setproductId(id);
      setName(name);
      setDescription(des);
      setPrice(price);
      setCategory(cate);
      setStock(stock);
      setOldImages(img);
    }
  };

  const deleteProductHandler = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId));
  };

  const productHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("des", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    if (className === "addProduct") {
      dispatch(createProduct(myForm));
    } else {
      dispatch(updateProduct(productId, myForm));
    }
  };

  const productImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (search.trim()) {
      setKeyword(search);
    } else {
      setKeyword("");
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (user.role !== "admin") {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (createError) {
      setErrorInfo(createError);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (deleteError) {
      setErrorInfo(deleteError);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (updateError) {
      setErrorInfo(updateError);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (success) {
      setSuccessInfo("Product Created Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    if (isDeleted) {
      setSuccessInfo("Product Deleted Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (isUpdated) {
      setSuccessInfo("Product Updated Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    dispatch(getAllProducts(keyword, currentPage));
  }, [
    isAuthenticated,
    navigate,
    user,
    dispatch,
    error,
    createError,
    deleteError,
    isDeleted,
    currentPage,
    isUpdated,
    updateError,
    success,
    keyword,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Snackbar
            open={openAlertError}
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity="error">
              {errorInfo}
            </Alert>
          </Snackbar>

          <Snackbar
            open={openAlertSuccess}
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity="success">
              {successInfo}
            </Alert>
          </Snackbar>

          <MetaData title={`ALL PRODUCTS - Admin`} />
          <div class="col-xxl-9 col-lg-8">
            <button
              class="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#primaryMenu1"
            >
              Show Menu
            </button>
            <div class="dashboard-right-sidebar">
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-product"
                  role="tabpanel"
                  aria-labelledby="pills-product-tab"
                >
                  <div class="product-tab">
                    <div
                      class="title title-flex"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <div class="title">
                        <h4 style={{ marginBottom: "0" }}>All Product</h4>
                      </div>

                      <div class="title">
                        <button
                          class="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAddEdit"
                          onClick={addProduct}
                        >
                          <AiOutlinePlusCircle style={{ fontSize: "20px" }} />{" "}
                          New Product
                        </button>
                      </div>
                    </div>
                    <div class="table-responsive dashboard-bg-box">
                      <form class="search-box1" onSubmit={searchSubmitHandler}>
                        <input
                          class="form-control"
                          type="search"
                          value={search}
                          placeholder="Searching name..."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          onChange={(e) => setSearch(e.target.value)}
                          style={{ width: "20%" }}
                        />
                      </form>

                      <table class="table product-table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Images</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Sales</th>
                            <th scope="col">Edit / Delete / Reviews</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products &&
                            products.map((product, index) => (
                              <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td class="product-image">
                                  <img
                                    src={product.images[0].url}
                                    class="img-fluid"
                                    alt=""
                                  />
                                </td>
                                <td style={{ maxWidth: "250px" }}>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {product.name}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    ${product.price}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {product.stock}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>152</h6>
                                </td>
                                <td class="efit-delete">
                                  <h6 style={{ marginBottom: "0" }}>
                                    <FiEdit
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalAddEdit"
                                      onClick={() => {
                                        handleSetProduct(
                                          product._id,
                                          product.name,
                                          product.des,
                                          product.price,
                                          product.category,
                                          product.stock,
                                          product.images
                                        );
                                        setClassName("editProduct");
                                      }}
                                      style={{
                                        color: "green",
                                        width: "19px",
                                        strokeWidth: "1.6px",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <AiOutlineDelete
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalDelete"
                                      onClick={() => {
                                        handleSetProduct(product._id);
                                        setClassName("deleteProduct");
                                      }}
                                      style={{
                                        color: "red",
                                        width: "19px",
                                        strokeWidth: "1.6px",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <Link to={`/admin/reviews/${product._id}`}>
                                      <GrLike
                                        style={{
                                          color: "red",
                                          width: "19px",
                                          strokeWidth: "1.6px",
                                          marginLeft: "10px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </Link>
                                  </h6>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      {itemsPerPage < productsCount && (
                        <nav class="custome-pagination">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={productsCount}
                            pageRangeDisplayed={3}
                            onChange={setCurrentPageNo}
                            innerClass="pagination justify-content-center"
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText={
                              <i class="fa-solid fa-angles-left"></i>
                            }
                            lastPageText={
                              <i class="fa-solid fa-angles-right"></i>
                            }
                            prevPageText={
                              <i class="fa-solid fa-angle-left"></i>
                            }
                            nextPageText={
                              <i class="fa-solid fa-angle-right"></i>
                            }
                          />
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={productHandler}>
            <div
              class="modal fade theme-modal"
              id="modalAddEdit"
              data-bs-backdrop="static"
              tabindex="-1"
              aria-labelledby="exampleModalLabel2"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      {className === "addProduct"
                        ? "Add New Product"
                        : "Edit Product"}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row g-4">
                      <div class="col-12">
                        <div class="form-floating theme-form-floating">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                          />
                          <label for="name">Name</label>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="form-floating theme-form-floating">
                          <input
                            type="number"
                            placeholder="Price"
                            required
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            class="form-control"
                            name="price"
                          />
                          <label for="price">Price</label>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="form-floating theme-form-floating">
                          <input
                            class="form-control"
                            type="number"
                            placeholder="Stock"
                            required
                            onChange={(e) => setStock(e.target.value)}
                            value={stock}
                            name="stock"
                          />
                          <label for="stock">Stock</label>
                        </div>
                      </div>

                      <div class="col-4">
                        <div class="form-floating theme-form-floating">
                          <select
                            value={category}
                            class="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Choose Category</option>
                            {categories.map((cate) => (
                              <option key={cate} value={cate}>
                                {cate}
                              </option>
                            ))}
                          </select>
                          <label for="des">Category</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <textarea
                          value={description}
                          class="form-control"
                          placeholder="Description"
                          height="150px"
                          onChange={(e) => setDescription(e.target.value)}
                          name="des"
                          rows="3"
                          cols="30"
                        ></textarea>
                      </div>

                      <div class="col-12">
                        <input
                          class="form-control"
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={productImagesChange}
                          multiple
                        />
                      </div>

                      <div class="col-12">
                        {oldImages &&
                          oldImages.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt="Old Product Preview"
                              style={{ height: "100px" }}
                            />
                          ))}
                      </div>

                      <div class="col-12">
                        {imagesPreview.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="Product Preview"
                            style={{ height: "100px" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      style={{ backgroundColor: "#0da487" }}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <form onSubmit={deleteProductHandler}>
            <div
              class="modal fade theme-modal remove-profile"
              id="modalDelete"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-lg">
                <div class="modal-content">
                  <div class="modal-header d-block text-center">
                    <h5 class="modal-title w-100" id="exampleModalLabel22">
                      Do you want to delete this product?
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      style={{ backgroundColor: "#0da487" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}
