import Image from "next/image";
import styles from "./page.module.css";
import { FaRegEdit } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialFacebook } from "react-icons/ti";
import { FaPinterest } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="" className={styles.logo}>
          <div>
            <span className={styles.logo1}>THE</span>
            <span className={styles.logo2}>Culture</span>
          </div>
        </Link>
        <div className={styles.headerRight}>
          <Link href="" className={styles.writeIcon}>
            <FaRegEdit />
            <span>Write</span>
          </Link>

          <div className={styles.profile}>T0</div>
        </div>
      </header>

      <main className={styles.main}>
        <h1>Authors Name</h1>

        <span>Posts</span>
        <div className={styles.horizontalLine}></div>

        <div className={styles.postsContainer}>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <span className={styles.horizontalLine2}></span>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>
          <div className={styles.post}>
            <h2 className={styles.postTitle}>Post Title</h2>

            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.authorIcon}>TO</span>
                <span className={styles.postAuthor}>You</span>
                <span className={styles.verticalLine}></span>
                <span className={styles.postDate}>
                  <IoCalendarClearOutline
                    className={styles.postDateCalendarIcon}
                  />
                  02 December 2014
                </span>
              </div>
              <div className={styles.postDescription}>
                Did you come here for something in particular or just general
                Riker-bashing? And blowing into maximum warp
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerContainer}>
            <Link href="" className={styles.logo}>
              <div>
                <span className={styles.logo1}>THE</span>
                <span className={styles.logo2}>Culture</span>
              </div>
            </Link>
            <div className={styles.footerPara}>
              At The Culture, we believe every writer has a unique story to
              tell. Whether you&apos;re sharing insights, crafting narratives,
              or exploring new ideas, our platform is your canvas. Join our
              community of passionate writers, and let your words inspire,
              connect, and resonate with readers around the world. Your voice
              matters here—write on!
            </div>
          </div>

          <div className={styles.footerContainer}>
            <h3>Quick Links</h3>
            <div>
              <ul>
                <li>
                  <Link href="{}" className={styles.footerLinks}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="{}" className={styles.footerLinks}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="{}" className={styles.footerLinks}>
                    {" "}
                    Support{" "}
                  </Link>
                </li>
                <li>
                  <Link href="{}" className={styles.footerLinks}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerContainer}>
            <h3>Follow On:</h3>
            <div className={styles.anchorContainer}>
              <a href="" className={styles.twitterIcon}>
                <TiSocialTwitter />
              </a>
              <a href="" className={styles.footerIcons}>
                <TiSocialFacebook />
              </a>
              <a href="" className={styles.footerIcons}>
                <FaPinterest />
              </a>
              <a href="" className={styles.footerIcons}>
                <RiInstagramFill />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.horizontalLine}></div>

        <div className={styles.copy}>copyright &copy; 2024 NimiDevs</div>
      </footer>
    </div>
  );
}
