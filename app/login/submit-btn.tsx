'use client'
import { useFormStatus } from "react-dom";
import styles from './page.module.css'

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button className={styles.signinButton} type="submit" disabled={pending}>
      {pending ? "logging in..." : "sign in"}
    </button>
  );
};

export default SubmitBtn
