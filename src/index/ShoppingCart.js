import React, { Component } from "react";
import "../styles/shopping-cart.css";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickUpPayment: 20
    };
  }
  render() {
    const { cart } = this.props;
    const { pickUpPayment } = this.state;
    const payment =
      cart.length === 0
        ? 0
        : cart
            .map(item => {
              return item.count * Number(item.item.pay);
            })
            .reduce((prev, curr) => {
              return prev + curr;
            });
    return (
      <div className="shopping-cart-container">
        <div className="shopping-cart-main">
          <div
            style={{ color: payment === 0 ? "#B6B6B6" : "#FFFFFF", fontSize: "14px", paddingLeft: "16px" }}
          >
            {payment === 0 ? '未选购商品' : `￥${payment}`}
          </div>
          <div
            className={
              "shopping-cart-money " + (payment > pickUpPayment ? "pick-up" : "")
            }
          >
            {payment === 0
              ? `￥${pickUpPayment}起送`
              : payment < pickUpPayment
              ? `还差${pickUpPayment - payment}元`
              : '去结算'}
          </div>
        </div>
      </div>
    );
  }
}
