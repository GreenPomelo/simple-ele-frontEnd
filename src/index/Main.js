import React, { Component } from "react";
import "../styles/main.css";
import Categories from "./Categories";
import Commodity from "./Commodity";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      chosen: "",
      scroll: 0
    };
  }
  getIndex(index) {
    this.setState({
      chosen: index
    });
  }
  getScroll(scroll, scrollTop) {
    this.setState({
      scroll: scroll
    });
  }
  getCart(item) {
    this.props.getCart(item);
  }
  render() {
    const { seller: result } = this.props;
    const { chosen, scroll } = this.state;
    const categoriesName = Object.keys(result.categories);
    return (
      <div className="main-container">
        <div style={{ width: "88px" }}>
          <Categories
            names={categoriesName}
            getIndex={index => this.getIndex(index)}
            scroll={scroll}
          />
        </div>
        <Commodity
          items={result}
          chosen={chosen}
          names={categoriesName}
          getScroll={scroll => this.getScroll(scroll)}
          getCart={item => {
            this.getCart(item);
          }}
        />
      </div>
    );
  }
}
