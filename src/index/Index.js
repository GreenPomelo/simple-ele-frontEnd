import React, { Component } from 'react'
import Header from './Header';
import Main from './Main';
import ShoppingCart from './ShoppingCart';
import "../App.css"
import data from "../data.json"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem : []
    }
  }
  getCart(item) {
    if(this.state.cartItem.indexOf(item) === -1) {
      this.state.cartItem.push(item)
    }
    this.setState({
      cartItem: this.state.cartItem
    })
  }
  render() {
    return (
      <div className="container">
        <Header information={data.information}></Header>
        <Main seller={data.result} getCart={this.getCart.bind(this)}></Main>
        <ShoppingCart cart={this.state.cartItem}></ShoppingCart> 
      </div>
    )
  }
}
