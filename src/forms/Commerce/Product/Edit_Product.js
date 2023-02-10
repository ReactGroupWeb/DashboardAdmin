import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/product.css";
import ApiService from "../../../service/api-service";
import Swal from "sweetalert2";
window.Swal = Swal;

export const Edit_Product = () => {
  const tbCategory = "categories";
  const tbProduct = "products";
  //create key
  const params = useParams();
  const [product, setProducts] = useState([]);
  const [productCate, setProductsCate] = useState([]);
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState();
  const [imgsArray, setimgsArray] = useState([]);
  const [changed, setChanged] = useState(false);
  const [imgschanged, setImgsChanged] = useState(false);
  const [checked, setChecked] = useState(false);
  //getting all data from tbProduct and tbCategory
  useEffect(() => {
    ApiService.get(tbProduct, params.id)
      .then((res) => {
        setProducts(res.data);
        setProductsCate(res.data.category == null ? "" : res.data.category);
        setimgsArray(res.data.images);
      })
      .catch((err) => {
        console.log(err);
      });
    ApiService.getAll(tbCategory)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //alart popup box when go back to list without save
  const alart = () => {
    if (changed || imgschanged) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          submit();
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  //edit new Image
  const hiddenImageUpload = React.useRef(null);
  const handleImageClick = () => hiddenImageUpload.current.click();
  const handleInputChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setProducts({
      ...product,
      image: event.target.files[0],
    });
    setChanged(true);
  };
  //edit multiple gallery image
  const hiddenGalleryUpload = React.useRef(null);
  const handleGalleryClicks = () => hiddenGalleryUpload.current.click();
  //edit productCategory
  const setProductCategory = (e) => {
    setProducts({
      ...product,
      category: e,
    });
  };
  //send data to api to update
  const submit = async () => {
    ApiService.update(tbProduct, params.id, product);
    if (imgschanged) {
      const dataImage = new FormData();
      Array.from(imgsArray).map((image) => {
        return dataImage.append(`images`, image);
      });
      ApiService.update(`${tbProduct}/gallery-images`, params.id, dataImage);
    }
  };
  return (
    <>
      <div className="content open">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <form action="" method="PUT" encType="multipart/form-data">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h3 className="fs-5">Edit Product</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        onClick={() => alart()}
                        to="/product"
                        className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-undo-alt me-2" />
                        Back To Product
                      </Link>
                      {changed || imgschanged ? (
                        <Link
                          to="/product"
                          onClick={() => submit()}
                          className="btn btn-warning bg-warning btn-sm float-end px-4 py-2 me-2 fw-bold"
                        >
                          <i className="fas fa-tools me-2" />
                          Update
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row mb-4">
                    {/* Name */}
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={product.name||""}
                          placeholder="name"
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              name: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                        <label htmlFor="name">Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="sku"
                          value={product.sku||""}
                          placeholder="SKU"
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              sku: e.target.value,
                            });
                            setChanged(true);
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
                          value={product.regularPrice||""}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              regularPrice: e.target.value,
                            });
                            setChanged(true);
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
                          value={product.salePrice||""}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              salePrice: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                        <label htmlFor="sale_price" className="form-label">
                          Sale Price
                        </label>
                      </div>
                    </div>
                    {/* countInstock */}
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          placeholder="quantity"
                          value={product.countInStock||""}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              countInStock: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                        <label htmlFor="quantity" className="form-label">
                          Quantity In Stock
                        </label>
                      </div>
                      {/* description */}
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control description"
                          placeholder="description"
                          value={product.description||""}
                          onChange={(e) => {
                            setProducts({
                              ...product,
                              description: e.target.value,
                            });
                            setChanged(true);
                          }}
                        ></textarea>
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                      </div>
                    </div>
                    {/* feature */}
                    <div className="col-md-12 py-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input px-3 py-2 me-3"
                          type="checkbox"
                          role="switch"
                          id="featured_product"
                          value={product.isFeatured||""}
                          checked={product.isFeatured}
                          onClick={() => {
                            setChecked(!checked);
                            setProducts({
                              ...product,
                              isFeatured: checked,
                            });
                            setChanged(true);
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
                      {/* category */}
                      <div className="mb-3">
                        <label htmlFor="utype" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 fs-6"
                          id="utype"
                          aria-label=".form-select-lg example"
                          onChange={(e) => {
                            setChanged(true);
                            setProductCategory(e.target.value);
                            setProductsCate(e.target.value);
                          }}
                          value={productCate._id||""}
                        >
                          {categories.map((categorys) => (
                            <option
                              key={`${categorys._id}`||""}
                              value={`${categorys._id}`||""}
                            >
                              {categorys.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Image */}
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          Product Image
                        </label>
                        <div
                          style={{
                            width: "40%",
                            margin: "10px auto",
                            textAlign: "center",
                          }}
                        >
                          <label
                            onClick={handleImageClick}
                            className="form-control"
                            style={{ cursor: "pointer" }}
                          >
                            Select Image
                          </label>
                          <input
                            ref={hiddenImageUpload}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={img ? img : `${product.image}`}
                            height="200px"
                            style={{
                              border: "1px solid white",
                              padding: "20px",
                            }}
                          />
                        </div>
                      </div>
                      {/* Images */}
                      <div className="mb-3">
                        <label htmlFor="images" className="form-label">
                          Product Images
                        </label>
                        <div
                          style={{
                            width: "40%",
                            margin: "10px auto",
                            textAlign: "center",
                          }}
                        >
                          <label
                            onClick={handleGalleryClicks}
                            className="form-control"
                            style={{ cursor: "pointer" }}
                          >
                            Select New Gallery (1-5 Files)
                          </label>
                          <input
                            ref={hiddenGalleryUpload}
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setimgsArray(e.target.files);
                              setImgsChanged(true);
                            }}
                            multiple
                          />
                        </div>
                        <div className="text-center">
                          {Array.from(imgsArray).map((item, i) => {
                            return (
                              <span key={i}>
                                <img
                                  style={{
                                    height: "150px",
                                    width: "150px",
                                    margin: "0 10px",
                                  }}
                                  src={
                                    imgschanged
                                      ? item
                                        ? URL.createObjectURL(item)
                                        : ""
                                      : item
                                  }
                                />
                              </span>
                            );
                          })}
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
