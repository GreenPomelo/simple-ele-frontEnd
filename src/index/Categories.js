import React, { Component } from "react";
import "../styles/categories.css";

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      chosen: 0
    };
  }
  changeChosen(index, item) {
    this.setState({
      chosen: index
    });
    this.props.getIndex(item);
  }
  componentWillReceiveProps(props) {
    this.setState({
      chosen: this.props.names.indexOf(props.scroll) === -1 ? this.state.chosen : this.props.names.indexOf(props.scroll)
    });
  }
  render() {
    const { names } = this.props;
    const { chosen } = this.state;
    return (
      <div className="categories-container">
        {names.map((item, index) => {
          return (
            <div
              key={index}
              className={
                "categories-item " + (chosen === index ? "chosen" : "")
              }
              onClick={this.changeChosen.bind(this, index, item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  }
}
