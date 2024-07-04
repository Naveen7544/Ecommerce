import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import Rating from "react-rating-stars-component";

const ProductsCard = (props) => {
  const { img, rating, description, title, price } = props;

  const [isAdded, setIsAdded] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = { ...props };
    dispatch(addItem(item));

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  console.log("imageeeeee",img)
  return (
    <>
      <div className="product_card">
        <figure>
          <img src={`http://localhost:4343/${img}`} alt="item-img" />
        </figure>
        <strong className="description">{description}</strong>
        <h4 className="title">{title}</h4>
        <h3 className="price">₹ {price.toLocaleString()}</h3>
        <button
          type="button"
          className={`btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>

        <div className="rating" style={{ marginBottom: "10px" }}>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={rating}
            edit={false}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
