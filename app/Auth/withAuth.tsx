"use client";
import React, { ComponentType, useEffect, useState } from "react";
import { getToken } from "../helpers/get-token-helper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css"
import loadingImage from '../../public/loading2.gif'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = getToken();
      

      if (!token) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false); // Stop loading after the check
    }, [router]);

    // Show a loading screen while checking auth
    if (isLoading) {
      return (
        <div className={styles.loading}>
          <Image
            src={loadingImage}
            alt="loading"
          ></Image>
        </div>
      ); // Replace with your preferred loading UI
    }

    // If authenticated, render the wrapped component
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null; // Prevent rendering if not authenticated (redirect will occur)
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
