"use client";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FcGoogle } from "react-icons/fc";
import logUserIn from "./requestUser";
import { redirect } from "next/navigation";
import SubmitBtn from "./submit-btn";

//Test import
import { usernameSchema, passwordSchema } from "./form-input-schema";
import { formatError } from "./format-error";

const FormComponent = () => {
  const [state, formAction] = useFormState(logUserIn, {});
  const [errorState, setErrorState] = useState(state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setErrorState(state);
    if (state.success) {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", JSON.stringify(state.token));
      redirect("/");
    }
  }, [state]);

  const validateUsername = (e: any) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    const usernameData = {
      username: newUsername,
    };
    const result = usernameSchema.safeParse(usernameData);
    let error = {};
    if (!result.success) {
      error = {
        errors: formatError(result.error),
      };
    }
    setErrorState(error);
  };

  const validatePassword = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordData = {
      password: newPassword,
    };
    const result = passwordSchema.safeParse(passwordData);
    let error = {};
    if (!result.success) {
      error = {
        errors: formatError(result.error),
      };
    }
    setErrorState(error);
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.containerHeader}>
        <h1>WELCOME BACK</h1>
        <span className={styles.detailSpan}>Welcome Back! Enter your details and lets get writing.</span>
        <span className={`${styles.generalError} ${styles.error}`}>
          {errorState?.errors?.formErrors?.map((error, index) => (
            <div key={`form-error-${index}`}>{error}</div>
          ))}
        </span>
      </div>

      <form action={formAction}>
        <div className={styles.inputContainer}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              placeholder="Enter Your Username"
              name="username"
              value={username}
              onChange={(e) => {
                validateUsername(e);
              }}
            />
            <span className={styles.error}>
              {errorState?.errors?.fieldErrors?.username}
            </span>
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              placeholder="********"
              name="password"
              value={password}
              onChange={(e) => {
                validatePassword(e);
              }}
            />
            <span className={styles.error}>
              {errorState?.errors?.fieldErrors?.password}
            </span>
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="checkbox" className={styles.checkboxLabel}>
            <input type="checkbox" id="checkbox" />
            Remember Me
          </label>
          Forgot password
        </div>
        <div className={styles.buttonContainer}>
          <SubmitBtn />
          
          <button className={styles.googleSignin}>
            {" "}
            <FcGoogle className={styles.icon} /> Sign in with Google
          </button>
        </div>
        <div className={styles.Action}>
          Not a writer?
          <a href="">Apply to be one Now!</a>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
