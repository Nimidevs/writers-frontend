import styles from "./page.module.css";
import FormComponent from "./form-component";

const Login = () => {
  return (
    <div className={styles.login}>
      <FormComponent />

      <div className={styles.posterImage}></div>
    </div>
  );
};

export default Login;
