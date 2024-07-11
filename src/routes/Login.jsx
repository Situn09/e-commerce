import { Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { handlePromise } from "../util/handlePromise";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authStatus";
import { bagActions } from "../store/bagSlice";
import useFetchCurrentUser from "../util/fetchCurrentUser";

const Login = () => {
  const dispatch = useDispatch();
  const bagItem = useSelector((store) => store.bag);
  const navigate = useNavigate();
  const authenticate = async (user) => {
    const [data, loginError] = await handlePromise(
      signInWithEmailAndPassword(auth, user.email, user.password)
    );
    if (data) {
      const { fetchUser } = useFetchCurrentUser();
      fetchUser().then((user) => {
        console.log("before bagItem : ", bagItem);
        dispatch(bagActions.updateCart(user.cartList || []));
        console.log("user :", user);
        console.log("user carlist :", user.cartList);
        console.log("after bagitem : ", bagItem);
      });
      dispatch(authAction.changeAuthStatus(true));

      toast.success("welcome to e-commerce website");
      navigate("/");
      console.log("user", data);
    }
    return loginError;
  };

  return (
    <div className="inner-box">
      <div className="signup-header">
        <h1>Login</h1>
      </div>

      <main className="signup-body">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              authenticate(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <p>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="***@gmail.com"
                  required
                />
              </p>
              {errors.email && touched.email && errors.email}
              <p>
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="At least 8 character"
                  required
                />
              </p>
              {errors.password && touched.password && errors.password}
              <p>
                <button type="submit" id="submit" disabled={isSubmitting}>
                  Login
                </button>
              </p>
            </form>
          )}
        </Formik>
      </main>
      <footer className="signup-footer">
        <p>
          have an Account? <Link to="/auth/signup">Signup</Link>
        </p>
      </footer>
    </div>
  );
};

export default Login;
