import { originalPrice } from "../util/originalPrice";
import { useNavigate } from "react-router-dom";
import AddCartButton from "./AddCartButton";

const HomeItem = ({ item }) => {
  const navigate = useNavigate();

  // console.log(item)

  return (
    <div className="item-container">
      <img
        className="item-image"
        src={item.thumbnail}
        alt="item image"
        onClick={() => navigate("detail", { state: item })}
      />
      <div className="rating">{item.rating} ⭐</div>
      <div className="company-name">{item.brand}</div>
      <div className="item-name">{item.title}</div>
      <div className="price">
        <span className="current-price">Rs {item.price}</span>
        <span className="original-price">
          Rs {originalPrice(item.price, item.discountPercentage)}
        </span>
        <span className="discount">({item.discountPercentage}% OFF)</span>
      </div>

      <AddCartButton item={item} />
    </div>
  );
};

export default HomeItem;
