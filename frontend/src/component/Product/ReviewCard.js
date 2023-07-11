import { Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  const formattedTimestamps = () => {
    const date = new Date(review.createReviewAt);

    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
      .replace(/\//g, "-");

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return ` ${formattedTime} ${formattedDate}`;
  };

  return (
    <div className="people-box">
      <div>
        <div className="people-image">
          <img src={review.avatarUrl} className="img-fluid lazyload" alt="" />
        </div>
      </div>

      <div className="people-comment">
        <div className="name">{review.name}</div>
        <div className="date-time">
          <h6 className="text-content">{formattedTimestamps()}</h6>
        </div>

        <Rating {...options} />

        <div className="reply">
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
