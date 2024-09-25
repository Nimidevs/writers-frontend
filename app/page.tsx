"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import Post from "./post";
import loadingImage from "../public/loading2.gif";
import { useEffect, useState } from "react";
import User from "./types";
import { createInitials } from "./types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    const token = tokenString ? JSON.parse(tokenString) : null;
    const user = userString ? JSON.parse(userString) : null;

    const initials = createInitials(user.first_name, user.last_name);

    setUser(user);
    setInitials(initials);

    const fetchWritersPosts = async (token: string) => {
      // if (!user || token) return;

      setLoading(true);

      try {
        const fetchResults = await fetch(
          `http://localhost:8080/api/posts/author/${user._id}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json; charset=UTF-8",
              Authorization: `${token}`,
            },
          }
        );
        if (!fetchResults.ok) {
          throw new Error("Failed to fetch posts");
        }

        const result = await fetchResults.json();
        if (result.success) {
          setPosts(result.posts);
        }
      } catch (error) {
        console.log("Error fetching writer's posts:", error);
        setErrors("Failed to fetch posts. Please Try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchWritersPosts(token);
  }, []);
  return (
    <div className={styles.container}>
      <Header initials={initials} />

      <main className={styles.main}>
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>

        <span>Posts</span>
        <div className={styles.horizontalLine}></div>

        <div className={styles.postsContainer}>
          {loading ? (
            <Image
              src={loadingImage}
              alt="loading"
              className={styles.loadingStateImage}
            ></Image>
          ) : errors !== null ? (
            <div className={styles.fetchError}>{errors}</div>
          ) : (
            posts?.map((post, index) => (
              <Post key={index} post={post} initials={initials} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
