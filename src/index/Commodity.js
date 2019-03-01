import React, { Component } from "react";
import picture from "../assets/image/4.png";
import add from "../assets/icon/添加菜品.png";
import "../styles/commodity.css";

export default class Commodity extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.isJumping = false;
    this.scroll = 0;
    this.isAdd = false;
    this.state = {
      itemArr: [],
      adding: true
    };
  }
  jumpTo(index) {
    this.isJumping = true;
    const children = this.container.current.children;
    let resultIndex = 0;
    for (let i = 0; i < children.length; i++) {
      if (children[i].dataset.belong === index) {
        resultIndex = i;
        break;
      }
    }
    const top = this.container.current.children[0].offsetTop;
    this.container.current.scrollTop =
      this.container.current.children[resultIndex].offsetTop - top;
    this.scroll = this.container.current.scrollTop
  }
  jumpToScroll(scrollTop) {
    this.container.current.scrollTop = scrollTop;
  }
  componentDidMount() {
    const children = this.container.current.children;
    let index = this.props.chosen || this.props.names[0];
    const stashScrollTop = {};
    stashScrollTop[index] = {};
    stashScrollTop[index].min = 0;
    const scrollTops = this.container.current.offsetTop;
    for (let i = 0; i < children.length; i++) {
      if (children[i].dataset.belong === index) {
        stashScrollTop[index].max =
          children[i].offsetTop - scrollTops + children[i].clientHeight;
      } else {
        index = children[i].dataset.belong;
        stashScrollTop[index] = {};
        stashScrollTop[index].max = children[i].offsetTop - scrollTops;
        stashScrollTop[index].min = children[i].offsetTop - scrollTops;
      }
    }
    let chosen = this.props.chosen || this.props.names[0];
    this.container.current.addEventListener(
      "scroll",
      function(e) {
        this.scroll = e.target.scrollTop;
        if (this.isJumping) {
          chosen = this.props.chosen;
          this.props.getScroll(this.props.chosen);
          return;
        }
        if (
          !(
            e.target.scrollTop > stashScrollTop[chosen].min &&
            e.target.scrollTop <= stashScrollTop[chosen].max
          )
        ) {
          let item = chosen;
          for (let i in stashScrollTop) {
            if (
              e.target.scrollTop > stashScrollTop[i].min &&
              e.target.scrollTop <= stashScrollTop[i].max
            ) {
              item = i;
            }
          }
          chosen = item;
          this.props.getScroll(chosen);
        }
      }.bind(this)
    );
  }
  addToCart(index) {
    const itemArr = this.state.itemArr;
    itemArr[index].count++;
    this.setState({
      itemArr: itemArr
    });
    this.setState(prevState => ({
      adding: !prevState.adding
    }));
    this.props.getCart(itemArr[index]);
    this.isAdd = true;
  }
  shouldComponentUpdate(nextProps, nextState) {
    setTimeout(() => {
      this.isAdd = false;
    }, 0);
    return nextProps.chosen !== this.props.chosen || this.isAdd;
  }
  componentWillMount() {
    const {
      items: { categories }
    } = this.props;
    const itemArr = [];
    for (let i of Object.keys(categories)) {
      let result = categories[i].map(item => {
        return {
          belong: i,
          item: item,
          count: 0
        };
      });
      itemArr.push(...result);
    }
    this.setState({
      itemArr: itemArr
    });
    this.items = itemArr;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.adding === this.state.adding) {
      this.jumpTo(this.props.chosen);
      setTimeout(() => {
        this.isJumping = false;
      }, 0);
    } else {
      this.jumpToScroll(this.scroll);
    }
  }
  render() {
    return (
      <div className="commodity-container" ref={this.container}>
        {this.state.itemArr.map((item, index) => {
          return (
            <div
              className="commodity-item"
              key={index}
              data-belong={item.belong}
            >
              <div
                className="commodity-item-picture"
                style={{ backgroundImage: `url(${picture})` }}
              />
              <div className="commodity-information">
                <div className="lines-title">{item.item.name}</div>
                <div className="lines">{item.item.introduce}</div>
                <div className="lines">{item.item.sell}</div>
                <div className="add-to-cart">
                  <div>
                    ￥<span style={{ fontSize: "14px" }}>{item.item.pay}</span>
                    元
                  </div>
                  <div className="bought-number">
                    {item.count === 0 ? null : (
                      <div className="number">{item.count}</div>
                    )}
                    <div style={{ position: "relative",width:'24px',height:'24px'}}>
                      <img
                        src={add}
                        alt=""
                        onClick={this.addToCart.bind(this, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
