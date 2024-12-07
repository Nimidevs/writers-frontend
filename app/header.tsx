"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import useClickOutside from "./removeDropdown";
import { getInitials } from "./types";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showWrite?: boolean;
  onPublish?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showWrite, onPublish }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownContainerRef = useRef(null);
  const [initials, setInitials] = useState("");
  const router = useRouter()

  useEffect(() => {
    const initials = getInitials();
    setInitials(initials);
  }, []);

  useClickOutside(dropdownContainerRef, () => {
    setDropdown(false);
  });

  const signOut = () => {
    localStorage.clear()
    router.push('/login')
  }
  
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <div>
          <span className={styles.logo1}>THE</span>
          <span className={styles.logo2}>Culture</span>
        </div>
      </Link>
      <div className={styles.headerRight}>

        {
          
        }
        {showWrite || showWrite === undefined ? (
          <Link href="/new-post" className={styles.writeIcon}>
            <FaRegEdit />
            <span>Write</span>
          </Link>
        ) : (
          onPublish && (
            <button
              className={styles.publish}
              onClick={() => {
                onPublish();
              }}
            >
              Publish
            </button>
          )
        )}

        <div
          className={styles.profile}
          ref={dropdownContainerRef}
          onClick={(e) => {
            setDropdown(true);
          }}
        >
          {initials}
          {dropdown ? (
            <ul className={styles.profiledropdown}>
              <li>
                <IoMdPerson />
                Profile
              </li>
              <li className={styles.logout} onClick={signOut}>
                {" "}
                <VscSignOut className={styles.logOutIcon} />
                Sign Out
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
