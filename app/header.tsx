"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import useClickOutside from "./removeDropdown";

interface HeaderProp {
  initials: string;
}
const Header: React.FC<HeaderProp> = ({ initials }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownContainerRef = useRef(null);

  useClickOutside(dropdownContainerRef, () => {
    setDropdown(false);
  });
  return (
    <header className={styles.header}>
      <Link href="" className={styles.logo}>
        <div>
          <span className={styles.logo1}>THE</span>
          <span className={styles.logo2}>Culture</span>
        </div>
      </Link>
      <div className={styles.headerRight}>
        <Link href="/new-story" className={styles.writeIcon}>
          <FaRegEdit />
          <span>Write</span>
        </Link>

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
              <li className={styles.logout}>
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
