"use client";
import { IoCalendarClearOutline } from "react-icons/io5";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

interface postProp {
  post: {
    _id: string;
    title: string;
    post_text: string;
    created_at: string;
    published: boolean;
    visit_count: number;
    featured: boolean;
    editors_pick: boolean;
    likes: number;
    updated_at: string;
    trending_score: number;
    viewTimeStamps: string[];
  };
  initials: string;
}

const Post: React.FC<postProp> = ({ post, initials }) => {
  return (
    <Link href={`/preview/${post._id}`} className={styles.postLink}>
      <div className={styles.post}>
        <h2 className={styles.postTitle}>{post.title}</h2>

        <div className={styles.postContent}>
          <div className={styles.postMeta}>
            <span className={styles.authorIcon}>{initials}</span>
            <span className={styles.postAuthor}>You</span>
            <span className={styles.verticalLine}></span>
            <span className={styles.postDate}>
              <IoCalendarClearOutline className={styles.postDateCalendarIcon} />
              {new Date(post.created_at).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {/* 02 December 2014 */}
            </span>
          </div>
          <div className={styles.postDescription}>
            {/* {post.post_text} */}
            Did you come here for something in particular or just general
            Riker-bashing? And blowing into maximum warp
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
