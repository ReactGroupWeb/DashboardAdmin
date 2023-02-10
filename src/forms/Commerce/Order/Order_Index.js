import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../service/api-service";
import Alart from "../../../service/Alart";
import DateLocal from "../../../service/DateLocal";
import Pagination from "../../../components/Pagination";

export const Order_Index = () => {
  const [orders, setOrders] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [status, setStauts] = useState("All");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const tb = "orders";
  useEffect(() => {
    setReRender(false);
    ApiService.getAll(status == "All" ? tb : `${tb}/get/${status}`).then(
      (res) => setOrders(res.data)
    );
  }, [reRender]);
  const changeOrderPP = (e) => setitemsPerPage(e);
  const changeStatus = (e) => {
    setStauts(e.target.value);
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
                <div className="float-end">
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
            <table className="table">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>S_Total</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Name</th>
                  <th>Tel</th>
                  <th>{status == "All" ? "Status" : "Email"}</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order, i) => (
                  <tr key={order.id}>
                    <th>{i + 1 + indexOfFirstItem}</th>
                    <td>$ {order.totalPrice}</td>
                    <td>$ {parseFloat(order.totalPrice * 0.1).toFixed(2)}</td>
                    <td>$ {order.totalPrice + order.totalPrice * 0.1}</td>
                    <td>{order.user ? order.user.name : ""}</td>
                    <td>{order.user ? order.user.phone : ""}</td>
                    <td>
                      {status == "All"
                        ? order.status
                        : order.user
                        ? order.user.email
                        : ""}
                    </td>
                    <td>{OrderDate(order.dateOrdered)}</td>
                    <td>
                      <Link
                        to={`/order/order_detail/${order.id}`}
                        className="btn btn-success bg-success btn-sm me-2"
                        title="Order Detail"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      {/* View Order Detail */}
                      <a
                        onClick={() => {
                          ApiService.updateStatus(tb, `${order.id}`);
                          setReRender(true);
                        }}
                        className="btn btn-warning btn-sm me-2"
                        title="Delivery Order"
                      >
                        <i className="fas fa-truck"></i>
                      </a>
                      {/* Delivery Order */}
                      {order.status != "Ordered" ? (
                        ""
                      ) : (
                        <a
                          className="btn btn-danger btn-sm"
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
