import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { auth, db } from "../lib/firebase";
import toast from "react-hot-toast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const AddCartButton = ({ item }) => {
  const dispatch = useDispatch();

  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0;

  const handleAddToBag = async () => {
    if (!auth?.currentUser) {
      toast.error("login first after that you can add");
      return;
    }
    try {
      await updateDoc(doc(db, "users", `${auth.currentUser.email}`), {
        cartList: arrayUnion(item.id),
      });
      toast.success("successfully item added");
    } catch (error) {
      toast.error("item didn't add");
      console.log(error);
    }
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = async () => {
    if (!auth?.currentUser) {
      toast.error("login first after that you can add");
      return;
    }
    try {
      await updateDoc(doc(db, "users", `${auth.currentUser.email}`), {
        cartList: arrayRemove(item.id),
      });
      toast.success(" successfully item removed");
    } catch (error) {
      toast.error("item didn't remove");
      console.log(error);
    }
    dispatch(bagActions.removeFromBag(item.id));
  };
  return (
    <div>
      {elementFound ? (
        <button
          type="button"
          className="btn btn-add-bag btn-danger"
          onClick={handleRemove}
        >
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default AddCartButton;
