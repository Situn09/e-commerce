import { Link } from "react-router-dom";
import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";
import { useSelector } from "react-redux";
import { auth } from "../lib/firebase";

const Bag = () => {
  console.log(auth.currentUser);
  if (!auth?.currentUser) {
    return (
      <h1 className="info">
        {" "}
        you are not login, go to the <Link to="/auth/login">
          Login page
        </Link>{" "}
      </h1>
    );
  }
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => {
    const itemIndex = bagItems.indexOf(item.id);
    return itemIndex >= 0;
  });
  return (
    <main>
      <div className="bag-page">
        {finalItems.length === 0 ? (
          <h1 className="info">Add some item to Cart</h1>
        ) : (
          <div className="bag-items-container">
            {finalItems.map((item) => (
              <BagItem item={item} showRemoveButton={true} />
            ))}
          </div>
        )}
        <BagSummary />
      </div>
    </main>
  );
};

export default Bag;
