import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiController from "../../../service/Controller";
import Alart from "../../../service/Alart";
import DateLocal from "../../../service/DateLocal";
import Pagination from "../../../components/Pagination";

export const Order_Index = () => {
  const [orders, setOrders] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [status, setStatus] = useState("All");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const tb = "orders";
  useEffect(() => {
    setReRender(false);
    ApiController.getAll(status == "All" ? tb : `${tb}/get/${status}`).then(
      (res) => setOrders(res.data)
    );
  }, [reRender]);
  const changeOrderPP = (e) => setitemsPerPage(e);
  const changeStatus = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
    setReRender(true);
  };
  const OrderDate = (date) => {
    const result = new Date(date);
    return `${result.getDate()}-${DateLocal.getShortMonth(
      result
    )}-${result.getFullYear()}`;
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12">
          <div className="bg-secondary rounded h-100 p-4">
            <div className="row py-2">
              <div className="col-md-6">
                <h3 className="fs-5">All Orders</h3>
              </div>
              <div className="col-md-6">
                <div className="float-md-end">
                  <label className="h5">Set Orders Status By</label>
                  <select
                    onChange={changeStatus}
                    value={status}
                    className="bg-secondary text-light ms-2"
                  >
                    <option value={"All"}>All</option>
                    <option value={"Ordered"}>Ordered</option>
                    <option value={"Delivering"}>Delivering</option>
                    <option value={"Success"}>Success</option>
                  </select>
                </div>
              </div>
            </div>
            <table className="table text-center text-md-start">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th className="d-none d-md-table-cell">S_Total</th>
                  <th className="d-none d-md-table-cell">Tax</th>
                  <th>Total</th>
                  <th>Name</th>
                  <th>Tel</th>
                  <th className="d-none d-md-table-cell">
                    {status == "All" ? "Status" : "Email"}
                  </th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order, i) => (
                  <tr key={order.id}>
                    <td>{i + 1 + indexOfFirstItem}</td>
                    <td className="d-none d-md-table-cell">
                      $ {order.subTotal.toFixed(2)}
                    </td>
                    <td className="d-none d-md-table-cell">
                      $ {order.tax.toFixed(2)}
                    </td>
                    <td>
                      $
                      {order.totalPrice.toFixed(2)}
                    </td>
                    <td>{order.user ? order.user.name : ""}</td>
                    <td>{order.user ? order.user.phone : ""}</td>
                    <td className="d-none d-md-table-cell">
                      {status == "All"
                        ? order.status
                        : order.user
                        ? order.user.email
                        : ""}
                    </td>
                    <td>{OrderDate(order.dateOrdered)}</td>
                    <td>
                      <Link
                        to={`/order/order_detail/${order.id}/order`}
                        className="btn btn-success bg-success btn-sm m-2"
                        title="Order Detail"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      {/* View Order Detail */}
                      {order.status == "Success" ? (
                        ""
                      ) : (
                        <a
                          onClick={() => {
                            ApiController.updateStatus(tb, `${order.id}`);
                            setReRender(true);
                          }}
                          className="btn btn-warning btn-sm m-2 text-light"
                          title="Delivery Order"
                        >
                          <i className="fas fa-truck"></i>
                        </a>
                      )}

                      {/* Delivery Order */}
                      {order.status != "Ordered" ? (
                        ""
                      ) : (
                        <a
                          className="btn btn-primary btn-sm m-2"
                          title="Cancel Order"
                          onClick={() => {
                            Alart.alartDelete(tb, `${order.id}`);
                            setReRender(true);
                          }}
                        >
                          <i className="fas fa-hourglass-half"></i>
                        </a>
                      )}
                      {/* Cancel Order */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length > itemsPerPage ? (
              <div>
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={orders.length}
                  paginate={paginate}
                />
              </div>
            ) : (
              ""
            )}
            <div>
              <label>Set Orders Per Page</label>
              <select
                onChange={(e) => {
                  changeOrderPP(e.target.value);
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
