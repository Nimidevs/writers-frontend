"use client";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getToken } from "./helpers/get-token-helper";
import { toast } from "react-toastify";

interface postProp {
  post: Post;
  initials: string;
  onDeletePost: (postId: string) => void;
}

const Post: React.FC<postProp> = ({ post, initials, onDeletePost }) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [posts, setPosts] = useState<Post>(post);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = () => {
    setDisplayDropdown(false); // Close dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) // Check if click is outside the dropdown
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick); // Clean up listener
    };
  }, []);

  const toggleDropdown = () => {
    setDisplayDropdown((prev) => !prev);
  };
  const token = getToken();
  async function togglePublish(
    postId: string,
    action: "publish" | "unpublish"
  ) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success(action === 'publish' ? 'Post Was Successfully Published' : "Post Was Successfully Unublished")
        setPosts(data.post); // Update the local state
      } else {
        toast.error('Couldnt change public status')
        console.error("Failed to toggle publish status:", response.statusText);
      }
    } catch (error) {
      toast.error('Failed to change published status, try again later')
      console.error("An error occurred:", error);
    }
  }
  async function deletePost(postId: string) {
    let id = postId
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Post Was Deleted Successfully")
        onDeletePost(postId);
      } else {
        toast.error("Couldn't delete Post")
        console.error("Failed to Delete Post:", response.statusText);
      }
    } catch (error) {
      toast.error("Failed to delete post, try again later")
      console.error("An error occurred:", error);
    }
  }
  return (
    <div className={styles.post}>
      <Link href={`/preview/${post._id}`} className={styles.postLink}>
        <h2 className={styles.postTitle}>{posts.title_preview}</h2>
      </Link>

      <div className={styles.postContent}>
        <div className={styles.postDetails}>
          <div className={styles.postMeta}>
            <span className={styles.authorIcon}>{initials}</span>
            <span className={styles.postAuthor}>You</span>
            <span className={styles.verticalLine}></span>
            <span className={styles.postDate}>
              <IoCalendarClearOutline className={styles.postDateCalendarIcon} />
              {new Date(posts.created_at).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div ref={dropdownRef}>
            <button
              className={styles.postMethods}
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
            >
              <BsThreeDots />
            </button>

            {displayDropdown && (
              <ul className={styles.postDropdown}>
                <li>
                  {posts.published ? (
                    <button
                      onClick={() => {
                        togglePublish(posts._id, "unpublish");
                        toggleDropdown();
                      }}
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        togglePublish(posts._id, "publish");
                        toggleDropdown();
                      }}
                    >
                      Publish
                    </button>
                  )}
                </li>
                <li onClick={() => deletePost(posts._id)}>Delete Post</li>
                <li>
                  <Link href={`/update-post/${posts._id}`} className={styles.postLink}>Update Post</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className={styles.postDescription}>
          {posts.subtitle_preview + " ..."}
        </div>
      </div>
    </div>
  );
};

export default Post;
