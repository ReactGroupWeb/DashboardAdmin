import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/api-service";
import Pagination from "../../components/Pagination";
import Alart from "../../service/Alart";
export const Slideshow_Index = () => {
  const [sliders, setSliders] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sliders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const tb = "sliders";
  useEffect(() => {
    setReRender(false);
    ApiService.getAll(tb).then((res) => setSliders(res.data));
  }, [reRender]);
  const swapOrder = (Cid, Nid) => {
    Nid != "Up" && Nid != "Down"
      ? ApiService.updateOrder(tb, Cid, Nid)
      : Alart.alartSwap(Nid);
    setReRender(true);
    // Alart.refresh();
  };
  const changeSliderPP = (e) => setitemsPerPage(e);
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="row">
              <div className="col-md-4 col-6">
                <h3 className="fs-5">Slideshow</h3>
              </div>
              <div className="col-md-4 col-6">
                <form>
                  <input
                    className="form-control bg-dark border-0"
                    type="search"
                    placeholder="Search"
                  />
                </form>
              </div>
              <div className="col-md-4 col-12">
                <Link
                  to="/slideshow/create_slideshow"
                  className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-md-end"
                >
                  <i className="fas fa-plus me-2" />
                  Add Slideshow
                </Link>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nº</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Event</th>
                  <th scope="col">Order</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((slider, i) => (
                  <tr key={slider.id}>
                    <th>{i + 1 + indexOfFirstItem}</th>
                    <td>
                      <img src={slider.image} height="50px" />
                    </td>
                    <td>{slider.title}</td>
                    <td>{slider.miniTitle}</td>
                    <td>{slider.order}</td>
                    <td>
                      <a
                        className="btn btn-success btn-sm me-2"
                        onClick={() => {
                          ApiService.updateEnable(tb, `${slider.id}`);
                          setReRender(true);
                        }}
                        title={`${slider.enable}`}
                      >
                        <i
                          className={`fas fa-eye${
                            slider.enable ? "" : "-slash"
                          }`}
                        />
                      </a>
                      <Link
                        to={`/slideshow/edit_slideshow/${slider.id}`}
                        className="btn btn-warning btn-sm me-2"
                        title="Edit"
                      >
                        <i className="fas fa-tools me-2"></i>Edit
                      </Link>
                      <a
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => {
                          Alart.alartDelete(tb, `${slider.id}`);
                          setReRender(true);
                        }}
                        title="Delete"
                      >
                        <i className="fas fa-trash alt me-2"></i>Delete
                      </a>
                      <a
                        className="btn btn-info btn-sm me-2"
                        onClick={() => {
                          swapOrder(
                            slider.id,
                            sliders[i - 1] ? sliders[i - 1].id : "Up"
                          );
                        }}
                        title="Move Up"
                      >
                        <i className="fa fa-caret-up"></i>
                      </a>
                      <a
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          swapOrder(
                            slider.id,
                            sliders[i + 1] ? sliders[i + 1].id : "Down"
                          );
                        }}
                        title="Move Down"
                      >
                        <i className="fa fa-caret-down"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sliders.length > itemsPerPage ? (
              <div>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  totalItems={sliders.length}
                  paginate={paginate}
                />
              </div>
            ) : (
              ""
            )}
            <div>
              <label>Set Sliders Per Page</label>
              <select
                onChange={(e) => {
                  changeSliderPP(e.target.value);
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
