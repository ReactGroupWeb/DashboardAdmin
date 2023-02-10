import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../service/api-service";
import Pagination from "../../../components/Pagination";
import Alart from "../../../service/Alart";

export const Category_Index = () => {
  const [categories, setCategories] = useState([]);
  const [reRender, setReRender] = useState(false);
  //about pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const changeCategoryPP = (e) => setitemsPerPage(e);
  const tb = "categories";

  useEffect(() => {
    ApiService.getAll(tb)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setReRender(false);
  }, [reRender]);
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="row">
              <div className="col-md-6">
                <h3 className="fs-5">Category</h3>
              </div>
              <div className="col-md-6">
                <Link
                  to="/category/create_category"
                  className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                >
                  <i className="fas fa-plus me-2" />
                  Add Category
                </Link>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nº</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((category, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1 + indexOfFirstItem}</th>
                    <td>
                      <img src={category.icon} width="45" />
                    </td>
                    <td>{category.name}</td>
                    <td>
                      <Link
                        to={`/category/edit_category/${category._id}`}
                        className="btn btn-warning btn-sm me-2"
                        title="Edit Category"
                      >
                        <i className="fas fa-tools me-2"></i>Edit
                      </Link>
                      <a
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          Alart.alartDelete(tb, `${category.id}`);
                          setReRender(true);
                        }}
                        title="Delete Category"
                      >
                        <i className="fas fa-trash-alt me-2"></i>Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {categories.length > itemsPerPage ? (
              <div>
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={categories.length}
                  paginate={paginate}
                />
              </div>
            ) : (
              ""
            )}
            <div>
              <label>Set Catetories Per Page</label>
              <select
                onChange={(e) => {
                  changeCategoryPP(e.target.value);
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
