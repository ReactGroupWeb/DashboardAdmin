import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiController from "../../service/Controller";
import DateLocal from "../../service/DateLocal";
import Pagination from "../Pagination";
export const Recent_Sale = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    ApiController.getAll(`orders/getSale/month`).then((res) =>
      setOrders(res.data)
    );
  }, []);
  const OrderDate = (date) => {
    const result = new Date(date);
    return `${result.getDate()}-${DateLocal.getShortMonth(
      result
    )}-${result.getFullYear()}`;
  };
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Recent Salse</h6>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-3">
            <thead>
              <tr className="text-white">
                <th>Date</th>
                <th>Customer</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order.id}>
                  <td>{OrderDate(order.dateSuccess)}</td>
                  <td>{order.user ? order.user.name : ""}</td>
                  <td>
                    ${" "}
                    {order.totalPrice.toFixed(2)}
                  </td>
                  <td>{`${order.status == "Success" ? "Paid" : ""}`} </td>
                  <td className="text-center">
                    <Link
                      to={`/order/order_detail/${order.id}/admin`}
                      className="btn btn-sm btn-primary"
                    >
                      Detail
                    </Link>
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
        </div>
      </div>
    </div>
  );
};
