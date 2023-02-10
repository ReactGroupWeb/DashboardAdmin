import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../service/api-service";
import Alart from "../../../service/Alart";
import "./styles/product.css";

export const Create_Product = () => {
  const tbCategory = "categories";
  const tbProduct = "products";
  const [product, setProducts] = useState({
    name: "",
    description: "",
    image: "",
    regularPrice: "",
    salePrice: "",
    sku: "",
    category: "",
    countInStock: "",
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    ApiService.getAll(tbCategory)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  //set Image
  const [img, setImg] = useState();
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleInputChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setProducts({
      ...product,
      image: event.target.files[0],
    });
  };
  const setProductCategory = (e) => {
    setProducts({
      ...product,
      category: e.target.value,
    });
  };
  const submit = async () => {
    if (
      product.name != "" ||
      product.description != "" ||
      product.image != "" ||
      product.category != ""
    )
      ApiService.create(tbProduct, product);
    else Alart.alartCreate("Product", "Name, Description, Image and Category");
  };
  return (
    <>
      <div className="content open">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <form action="" method="POST" encType="multipart/form-data">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h3 className="fs-5">Create Product</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/product"
                        className="btn btn-danger btn-sm bg-danger px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-undo-alt me-2" />
                        Back To Product
                      </Link>
                      <Link
                        to="/product"
                        className="btn btn-success btn-sm float-end px-4 py-2 me-2 fw-bold"
                        onClick={() => submit()}
                      >
                        <i className="fas fa-share-square me-2" />
                        Save
                      </Link>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={product.name}
                          placeholder="name"
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              name: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="name">Name *</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="sku"
                          value={product.sku}
                          placeholder="SKU"
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              sku: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="sku" className="form-label">
                          SKU
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="regular_price"
                          placeholder="regular_price"
                          value={product.regularPrice}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              regularPrice: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="regular_price" className="form-label">
                          Regular Price
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="sale_price"
                          placeholder="sale price"
                          value={product.salePrice}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              salePrice: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="sale_price" className="form-label">
                          Sale Price
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          placeholder="quantity"
                          value={product.countInStock}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              countInStock: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="quantity" className="form-label">
                          Quantity In Stock
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control description"
                          placeholder="description"
                          value={product.description}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              description: e.target.value,
                            });
                          }}
                        ></textarea>
                        <label htmlFor="description" className="form-label">
                          Description *
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12 py-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input px-3 py-2 me-3"
                          type="checkbox"
                          role="switch"
                          id="featured_product"
                          value={product.isFeatured}
                          onClick={() => {
                            setChecked(!checked);
                            setProducts({
                              ...product,
                              isFeatured: checked,
                            });
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="featured_product"
                        >
                          Featured Product
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="utype" className="form-label">
                          Category *
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 fs-6"
                          id="utype"
                          aria-label=".form-select-lg example"
                          onChange={setProductCategory}
                        >
                          <option>Select Category</option>
                          {categories.map((category) => (
                            <option
                              key={`${category._id}`}
                              value={`${category._id}`}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Product Image *
                        </label>
                        <div
                          style={{
                            width: "40%",
                            margin: "10px auto",
                            textAlign: "center",
                          }}
                        >
                          <label
                            onClick={handleClick}
                            className="form-control"
                            style={{ cursor: "pointer" }}
                          >
                            Select Image
                          </label>
                          <input
                            ref={hiddenFileInput}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {img ? (
                            <img
                              src={URL.createObjectURL(product.image)}
                              height="200px"
                              style={{
                                border: "1px solid white",
                                padding: "20px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
