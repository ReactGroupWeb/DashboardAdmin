import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiService from "../../../service/api-service";
import DateLocal from "../../../service/DateLocal";
export const Order_Detail = () => {
  const params = useParams();

  const [order, setOrder] = useState([]);
  const [orderitems, setOrderItems] = useState([]);
  useEffect(() => {
    ApiService.get("orders", params.id).then((res) => {
      setOrder(res.data);
      setOrderItems(res.data.orderItems);
    });
  }, []);
  const OrderDate = (date) => {
    const result = new Date(date);
    return `${result.getDate()}-${DateLocal.getShortMonth(
      result
    )}-${result.getFullYear()}`;
  };
  const DeliverDate = (date) => {
    const result = new Date(date);
    return `${result.getDate()}-${DateLocal.getShortMonth(
      result
    )}-${result.getFullYear()} (${DateLocal.formatAMPM(result)})`;
  };
  return (
    <div className="content open">
      {/* Delivered or Cancelled Section */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12">
            <div className="bg-secondary rounded h-100 p-4">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h3 className="fs-5">ORDERS DETAILS</h3>
                </div>
                <div className="col-md-6">
                  <Link
                    to="/order"
                    className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                  >
                    <i className="fas fa-undo-alt me-2" />
                    Back To Order
                  </Link>
                </div>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Order ID</th>
                    <td>{order.id}</td>
                  </tr>
                  <tr>
                    <th>Order Date</th>
                    <td>{OrderDate(order.dateOrdered)}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{order.status}</td>
                  </tr>
                  <tr>
                    {/* Delivered Date is going to appear when you click "Delivery Button" on Order Index page */}
                    <th>Delivered Date</th>
                    <td>
                      {order.dateDelivered == null
                        ? "Not Yet Deliver"
                        : DeliverDate(order.dateDelivered)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Order Item */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12">
            <div className="bg-secondary rounded h-100 p-4">
              <div className="row mb-4">
                <div className="col-md-12">
                  <h3 className="fs-5">ORDERED ITEMS</h3>
                </div>
              </div>

              <div className="row mb-4 py-2">
                <div className="col-md-6">
                  <h3 className="fs-5">Products Item</h3>
                </div>
              </div>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderitems.map((orderItem, i) => (
                    <tr key={orderItem._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img src={orderItem.product.image} width="50" />
                      </td>
                      <td>{orderItem.product.name}</td>
                      <td>{orderItem.quantity}</td>
                      <td>$ {orderItem.product.salePrice}</td>
                      <td>
                        $ {orderItem.quantity * orderItem.product.salePrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row mb-4 py-2">
                <div className="col-md-6">
                  <h3 className="fs-5">Order Summary</h3>
                </div>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>SubTotal</td>
                    <th className="text-end">$ {order.totalPrice}</th>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <th className="text-end">
                      $ {parseFloat(order.totalPrice * 0.1).toFixed(2)}
                    </th>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <th className="text-end">Free Shipping</th>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <th className="text-end">
                      $ {order.totalPrice + order.totalPrice * 0.1}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12">
            <div className="bg-secondary rounded h-100 p-4">
              <div className="row mb-4 py-2">
                <div className="col-md-6">
                  <h3 className="fs-5">BILLING DETAILS</h3>
                </div>
              </div>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{order.user ? order.user.name : ""}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{order.user ? order.user.email : ""}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{order.user ? order.user.phone : ""}</td>
                  </tr>
                  <tr>
                    <th>Shipping Address</th>
                    <td>{order.shippingAddress}</td>
                  </tr>
                  <tr>
                    <th>{"City/Province"}</th>
                    <td>{order.city}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{order.country}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction */}
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12">
            <div className="bg-secondary rounded h-100 p-4">
              <div className="row mb-4 py-2">
                <div className="col-md-6">
                  <h3 className="fs-5">TRANSACTION</h3>
                </div>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Transaction Mode</th>
                    <td>{order.Tmode ? "Payment Card" : "Cash On Delivery"}</td>
                  </tr>
                  <tr>
                    <th>Transaction Status</th>
                    <td>{order.Tstatus ? "Purchesed" : "Pending"}</td>
                  </tr>
                  <tr>
                    <th>Transaction Date</th>
                    <td>
                      {order.TDate == null ? "" : DeliverDate(`${order.TDate}`)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
