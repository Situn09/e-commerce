import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { bagActions } from "../store/bagSlice";
import { originalPrice } from "../util/originalPrice";
import { useLocation } from "react-router-dom";
import AddCartButton from "../components/AddCartButton";

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { state: item } = useLocation();

  console.log(item);
  return (
    <div className="detail-item-container">
      <div className="detail-item-left-part">
        <img className="bag-item-img" src={item.thumbnail} />
      </div>
      <div className="detail-item-right-part">
        <div className="company">{item.brand}</div>
        <div className="item-name">{item.title}</div>
        <div>{item.description}</div>
        <div className="price-container">
          <span className="current-price">Rs {item.price}</span>
          <span className="original-price">
            Rs {originalPrice(item.price, item.discountPercentage)}
          </span>
          <span className="discount-percentage">
            ({item.discountPercentage}% OFF)
          </span>
        </div>
        <div className="return-period">{item.returnPolicy}</div>
        <AddCartButton item={item} />
      </div>
      <div className="reviews">
        <h1>Reviews</h1>
        {item.reviews.map((review) => (
          <div className="review">
            <h3>{review.reviewerName}</h3>
            <div className="email">{review.reviewerEmail}</div>
            <div className="start">{"⭐".repeat(review.rating)}</div>
            <div>{review.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetail;
