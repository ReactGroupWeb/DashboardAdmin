import React from "react";
import { Sale_Revenue } from "../../components/Sale_Revenue/Sale_Revenue";
import { Recent_Sale } from "../../components/Recent_Sale/Recent_Sale";
import { Widgets } from "../../components/Widgets/Widgets";
import { Footer } from "../../components/Footer/Footer";
import { Back_To_Top } from "../../components/Back_To_Top/Back_To_Top";

export const Home = () => {
  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="content open">
        <Sale_Revenue />
        <Recent_Sale />
        <Widgets />
        <Footer />
      </div>
      <Back_To_Top />
    </div>
  );
};
