import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { bagActions } from "../store/bagSlice";
import { originalPrice } from "../util/originalPrice";

const BagItem = ({ item, showRemoveButton }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={item.thumbnail} />
      </div>
      <div className="item-right-part">
        <div className="company">{item.brand}</div>
        <div className="item-name">{item.title}</div>
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
        <div className="delivery-details">
          <span className="delivery-details-days">
            {item.shippingInformation}
          </span>
        </div>
      </div>

      {showRemoveButton && (
        <div className="remove-from-cart" onClick={handleRemoveItem}>
          <RiDeleteBin5Fill />
        </div>
      )}
    </div>
  );
};

export default BagItem;
