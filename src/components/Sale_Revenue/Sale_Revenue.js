import React, { useEffect, useState } from "react";
import ApiController from "../../service/Controller";

export const Sale_Revenue = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const subTotalSales = orders.reduce(
    (previous, current) => previous + new Number(current.subTotal),
    0
  );
  useEffect(() => {
    ApiController.getAll(`products/getcount/count`).then((res) =>
      setProducts(res.data)
    );
    ApiController.getAll(`orders/getSale/month`).then((res) =>
      setOrders(res.data)
    );
  }, []);
  return (
    //fa-chart-bar || fa-chart-line
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-box fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Total Products</p>
              <h6 className="mb-0">{products.productCount} Products</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-bar fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Sub Total</p>
              <h6 className="mb-0">$ {subTotalSales.toFixed(2)}</h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-pie fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Sell & Tax</p>
              <h6 className="mb-0">
                $ {parseFloat(subTotalSales * 0.1).toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
            <i className="fa fa-chart-area fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Total Sale</p>
              <h6 className="mb-0">
                $ {parseFloat(subTotalSales + subTotalSales * 0.1).toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
