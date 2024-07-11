import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { handlePromise } from "../util/handlePromise";

const Signup = () => {
  const navigate = useNavigate();

  const setUserData = async (user) => {
    try {
      const userCollection = collection(db, "users");

      const userQuery = query(userCollection, where("email", "==", user.email));

      const usersSnapshot = await getDocs(userQuery);

      if (usersSnapshot.docs.length > 0) {
        toast.error("username already exists");
        return;
      }

      await setDoc(doc(db, "users", auth.currentUser.email), {
        fullName: user.fullName,
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      toast.success("welcome to e-commerce website ");
    } catch (error) {
      toast.error("user data can't store in firebase");
      console.log(error);
    }
  };

  return (
    <div className="inner-box">
      <div className="signup-header">
        <h1>Sign up</h1>
        <p>it takes less than 30 second </p>
      </div>

      <main className="signup-body">
        <Formik
          initialValues={{ email: "", password: "", fullName: "" }}
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
            setTimeout(async () => {
              // alert(JSON.stringify(values, null, 2));
              const [data, signupError] = await handlePromise(
                createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                )
              );
              if (signupError) {
                toast.error(signupError.message);
              } else {
                setUserData(values);
                toast.success("signup successfully");
                navigate("/auth/login");
              }

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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <p>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  placeholder="name"
                />
              </p>
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
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </p>
            </form>
          )}
        </Formik>
      </main>
      <footer className="signup-footer">
        <p>
          Already have an Account? <Link to="/auth/login">Login</Link>
        </p>
      </footer>
    </div>
  );
};

export default Signup;
