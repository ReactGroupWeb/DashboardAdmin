import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../service/api-service";
import Pagination from "../../../components/Pagination";
import Alart from "../../../service/Alart";

export const Product_Index = () => {
  const tb = "products";
  const [products, setProducts] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeProductPP = (e) => setitemsPerPage(e);
  useEffect(() => {
    ApiService.getAll(tb).then((res) => {
      setProducts(res.data);
    });
    setReRender(false);
  }, [reRender]);
  const stockStatus = (countInStock) => {
    if (countInStock == 0) return "Out Of Stock";
    else if (countInStock < 20) return "Low In Stock";
    else return "In Stock";
  };
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="row">
              <div className="col-md-6">
                <h3 className="fs-5">Product</h3>
              </div>
              <div className="col-md-6">
                <Link
                  to="/product/create_product"
                  className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                >
                  <i className="fas fa-plus me-2" />
                  Add Product
                </Link>
              </div>
            </div>

            {/* {category.map((cate) => (
              <div>{cate.name}</div>
            ))} */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nº</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product Code</th>
                  <th scope="col">Stock Status</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Regular Price</th>
                  <th scope="col">Sale Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, i) => (
                  <tr key={product.id}>
                    <th scope="row">{i + 1 + indexOfFirstItem}</th>
                    <td>
                      <img src={product.image} width="40" />
                    </td>
                    <td>{product.sku}</td>
                    <td>{stockStatus(`${product.countInStock}`)}</td>
                    <td>{product.name}</td>
                    <td>
                      {product.category == null ? "" : product.category.name}
                    </td>
                    <td>{product.countInStock}</td>
                    <td>$ {product.regularPrice}</td>
                    <td>$ {product.salePrice}</td>
                    <td>
                      <Link
                        to={`/product/edit_product/${product.id}`}
                        className="btn btn-warning btn-sm me-2"
                        title="Edit Product"
                      >
                        <i className="fas fa-tools"></i>
                      </Link>
                      <a
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          Alart.alartDelete(tb, `${product.id}`);
                          setReRender(true);
                        }}
                        title="Delete"
                      >
                        <i className="fas fa-trash alt"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length > itemsPerPage ? (
              <div>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  totalItems={products.length}
                  paginate={paginate}
                />
              </div>
            ) : (
              ""
            )}
            <div>
              <label>Set Products Per Page</label>
              <select
                onChange={(e) => {
                  changeProductPP(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-secondary text-light ms-2"
                value={itemsPerPage}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
