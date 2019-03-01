import React, { Component } from 'react'
import "../styles/header.css"
import BackArrow from "../assets/icon/back-arrow.png"
import ShopPicture from "../assets/icon/green-lemon.jpg"
export default class Header extends Component {
  render() {
    const { information } = this.props;
    return (
      <div className="header-container">
        <div className="header-image-container">
          <img className="back-arrow" src={ BackArrow } alt=""/>
            <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
              <img className="shop-picture" src={ ShopPicture } alt=""/>
            </div>
          </div>
        <div className="header-information">
          <div className="header-information-name">{information.name}</div>
          <div className="header-information-info">
            <div>评价{information.judge}</div>
            <div>月售 {information.sell}</div>
            <div>{information.send}</div>
          </div>
        </div>
      </div>
    )
  }
}
