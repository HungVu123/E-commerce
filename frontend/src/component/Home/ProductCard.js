import React from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
    <div
      className="product-box product-white-bg wow fadeIn"
    >
      <div className="product-image">
          <img
            src={product.images[0].url}
            className="img-fluid lazyload"
            alt=""
          />
      </div>
      <div className="product-detail position-relative" style={{alignContent:'center'}}>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <h6 className="name">{product.name}</h6>
        </Link>
        <h6 class="price">
          <span class="theme-color">${product.price}</span>{" "}
          <del
            style={{
              marginLeft: "4px",
              color: "#777",
              fontWeight: "400",
              fontSize:
                "calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)))",
            }}
          >
            $15.15
          </del>
        </h6>
        <div>
          <Rating {...options} />
          <span className="productCardSpan" style={{color:'black'}}>
          <h6
          className="weight"
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "#777",
            marginTop:
              "calc(6px + (10 - 6) * ((100vw - 320px) / (1920 - 320)))",
          }}
        >
          ({product.numOfReviews} Reviews)
        </h6>  
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}
