"use client";
import { toast } from "react-toastify";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import Post from "./post";
import loadingImage from "../public/loading2.gif";
import { useEffect, useState } from "react";
import User from "./types";
import { getInitials } from "./types";
import withAuth from "./Auth/withAuth";

function Home() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    const token = tokenString ? JSON.parse(tokenString) : null;
    const user = userString ? JSON.parse(userString) : null;

    const initials = getInitials();

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
        console.log(result);
        if (result.success && result.posts.length > 0) {
          setPosts(result.posts);
        } else {
          toast.info('No Posts Found')
          setPosts([]);
        }
      } catch (error) {
        setPosts([]);
        toast.error('Failed to fetch posts. Please Try again later')
        console.log("Error fetching writer's posts:", error);
        // setErrors("Failed to fetch posts. Please Try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchWritersPosts(token);
  }, []);

  const postDeleted = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
  };
  return (
    <div className={styles.container}>
      <Header />

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
          ) : errors ? (
            <div className={styles.fetchError}>{errors}</div>
          ) : posts.length > 0 ? (
            posts?.map((post) => (
              <Post
                key={post._id}
                post={post}
                initials={initials}
                onDeletePost={postDeleted}
              />
            ))
          ) : (
            <div className={styles.emptyState}>No Posts found.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
export default withAuth(Home)
