import { useDispatch, useSelector } from "react-redux";
import { push, set, update } from "firebase/database";
import useFetchCurrentUser from "../util/fetchCurrentUser";
import { auth, db } from "../lib/firebase";
import { addDoc, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { ref } from "firebase/storage";
import { bagActions } from "../store/bagSlice";

const BagSummary = () => {
  const bagItemIds = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const finalItems = items.filter((item) => {
    const itemIndex = bagItemIds.indexOf(item.id);
    return itemIndex >= 0;
  });

  const CONVENIENCE_FEES = 99;
  let totalItem = bagItemIds.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  // console.log(finalItems);
  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.price;
    totalDiscount += bagItem.discountPercentage;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const addToPurchaseList = async () => {
    try {
      await updateDoc(doc(db, "users", `${auth.currentUser.email}`), {
        purchaseList: arrayUnion(...finalItems),
      });
      toast.success("update successfully");
    } catch (error) {
      toast.error("can't updated");
      console.log(error);
    }
  };

  const placeOrder = async () => {
    addToPurchaseList();
    try {
      await updateDoc(doc(db, "users", `${auth.currentUser.email}`), {
        cartList: [],
      });
      dispatch(bagActions.removeAllItem());
      toast.success("Thank you for Shopping");
    } catch (error) {
      toast.error("Order can't placed");
      console.log(error);
    }
  };

  if (totalItem === 0) return;

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ({totalItem} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP.toFixed(2)}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount.toFixed(2)}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order" onClick={placeOrder}>
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default BagSummary;
