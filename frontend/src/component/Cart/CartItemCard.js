import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

export default function CartItemCard({
  item,
  deleteCartItems,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <>
      <td className="product-detail">
        <div className="product border-0">
          <Link
            to={`/product/${item._id}`}
            style={{ textDecoration: "none" }}
            className="product-image"
          >
            <img
              src="../assets/images/vegetable/product/1.png"
              className="img-fluid lazyload"
              alt=""
            />
          </Link>
          <div className="product-detail">
            <ul>
              <li className="name">
                <Link
                  to={`/product/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {item.name}
                </Link>
              </li>

              <li className="text-content">
                <span className="text-title">Sold By:</span> Fresho
              </li>

              <li className="text-content">
                <span className="text-title">Quantity</span> - 500 g
              </li>
            </ul>
          </div>
        </div>
      </td>

      <td className="price">
        <h4 className="table-title text-content">Price</h4>
        <h5>
          ${item.price} <del className="text-content">$45.68</del>
        </h5>
        <h6 className="theme-color">You Save : $20.68</h6>
      </td>

      <td className="quantity">
        <h4 className="table-title text-content">Qty</h4>
        <div className="quantity-price">
          <div className="cart_qty">
            <div className="input-group" style={{ zIndex: "0" }}>
              <button
                type="button"
                className="btn qty-left-minus"
                data-type="minus"
                data-field=""
                onClick={() => decreaseQuantity(item.product, item.quantity)}
              >
                <i className="fa fa-minus ms-0" aria-hidden="true"></i>
              </button>
              <input
                className="form-control input-number qty-input"
                type="number"
                value={item.quantity}
                readOnly
                name="quantity"
              />
              <button
                type="button"
                className="btn qty-right-plus"
                data-type="plus"
                data-field=""
                onClick={() =>
                  increaseQuantity(item.product, item.quantity, item.stock)
                }
              >
                <i className="fa fa-plus ms-0" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </td>

      <td className="subtotal">
        <h4 className="table-title text-content">Total</h4>
        <h5>${item.price * item.quantity}</h5>
      </td>

      <td className="save-remove">
        <h4 className="table-title text-content">Action</h4>
        <button className="remove close_button" onClick={() => deleteCartItems(item.product)} style={{border:"none",backgroundColor:"transparent"}}> Remove</button>
      </td>
    </>
  );
}
