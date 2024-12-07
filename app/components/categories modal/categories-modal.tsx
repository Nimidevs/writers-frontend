"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import User from "@/app/types";
import Select, { MultiValue } from "react-select";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/helpers/get-token-helper";
import { getUser } from "@/app/helpers/get-user-helper";
import { toast } from "react-toastify";

export const Categoriesmodal: React.FC<modalProps> = ({
  postImage = [],
  title,
  description,
  onclose,
  postDelta,
  titleDelta,
  postText,
  titleText,
  update,
  existingCategories,
  id,
}) => {
  const [userObj, setUserObj] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dropDownOptions, setDropDownOptions] = useState<options[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    options[] | null
  >(null);
  const [titlePreview, setTitlePreview] = useState("");
  const [descriptionPreview, setDescriptionPreview] = useState("");
  const router = useRouter();
  useEffect(() => {
    const user = getUser();

    const token = getToken();

    if (typeof title === "string" && title.trim().length > 1) {
      setTitlePreview(title);
    }

    if (typeof description === "string" && description.trim().length > 1) {
      setDescriptionPreview(description);
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        const data = await response.json();
        let options: options[] = data.categories.map((category: category) => ({
          value: category._id,
          label: category.name,
        }));
        setDropDownOptions(options);
        if (existingCategories) {
          console.log(existingCategories);
          let defaultOptions: options[] = options.filter(
            (option) =>
              option.value && existingCategories.includes(option?.value)
          );
          console.log(defaultOptions);
          setSelectedCategories(defaultOptions);
        }
      } catch (error) {
        displayErrorMessage(
          "There was an error fetchng categories.. Try again later"
        );
      }
    };

    setUserObj(user);
    fetchCategories();
  }, [description, existingCategories, title]);

  function displayErrorMessage(message: string) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  }

  const uploadPost = async () => {
    if (!selectedCategories || selectedCategories?.length < 1) {
      displayErrorMessage("Select at least one category");
      return;
    }

    const token = getToken();

    const categories = selectedCategories
      ?.map((category) => category.value)
      .filter((value): value is string => value !== undefined);

    console.log(categories);

    let payload: Uploadpayload = {
      title: titleDelta,
      post: postDelta,
      categories: categories,
      title_preview: titlePreview,
      subtitle_preview: descriptionPreview,
      title_text: titleText,
      post_text: postText,
    };

    postImage.length > 0 ? (payload["image_preview"] = postImage[0]) : null;

    try {
      const url = update
        ? `http://localhost:8080/api/posts/${id}/update`
        : `http://localhost:8080/api/posts/create`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          update ? "Post Updated Successfully" : "Post Uploaded Successfully"
        );
        router.push("/");
      } else {
        toast.error(
          update ? "Post could not be Updated" : "Post could not be Uploaded"
        );
        displayErrorMessage("Post could not be uploaded, Try again later.");
      }
    } catch (error) {
      toast.error(
        update
          ? "Post could not be Updated, Try again Later"
          : "Post could not be Uploaded, Try again Later"
      );
      console.log(error);
    }
  };

  const isOptionDisabled = (selectedOptions: options[] | null): boolean => {
    return (selectedOptions || []).length > 3;
  };

  // Helper function to map options and disable them if the selection limit is reached
  const getUpdatedOptions = (
    options: options[],
    selectedOptions: options[] | null
  ) => {
    const disableOptions = isOptionDisabled(selectedOptions);
    return options.map((option) => ({
      ...option,
      isDisabled:
        disableOptions &&
        !selectedOptions?.some((selected) => selected.value === option.value),
    }));
  };
  const handleCategoryChange = (selectedOptions: MultiValue<options>) => {
    if (selectedOptions.length > 3) {
      setErrorMessage("You cant select more than 3 Categories");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return; // Block further selections
    }
    setSelectedCategories([...selectedOptions]); // Convert to mutable array
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onclose}>
          x
        </button>
        <div className={styles.postReview}>
          Post preview
          {postImage.length < 1 ? (
            <div className={styles.imageSubstitute}>
              <span>
                include a high quality image in your story. This helps increase
                engagement
              </span>
            </div>
          ) : (
            // <img src={postImage[0]} alt="" />
            <Image
              src={postImage[0]}
              alt="preview"
              className={""}
              width={100}
              height={200}
            ></Image>
          )}
          <div>
            <input
              type="text"
              className={`${styles.input} ${styles.title}`}
              value={titlePreview}
              onChange={(e) => {
                setTitlePreview(e.target.value);
              }}
              placeholder="Write a preview Title"
              maxLength={140}
            />
          </div>
          <div>
            <input
              type="text"
              className={`${styles.input} ${styles.description}`}
              value={descriptionPreview}
              onChange={(e) => {
                setDescriptionPreview(e.target.value);
              }}
              placeholder="Write a preview Subtitle"
              maxLength={200}
            />
          </div>
          <span className={styles.note}>
            <strong>Note: </strong>Changes here will affect how your post
            appears to viewers and readers - not the content of the blog post
            itself
          </span>
        </div>

        <div className={styles.modalCategories}>
          {errorMessage && <span className={styles.error}>{errorMessage}</span>}
          <span>
            {" "}
            Posting To:{" "}
            <strong>
              {userObj?.first_name} {userObj?.last_name}
            </strong>
          </span>
          Add or change categories (up to 3), so readers know what your blog
          post is about
          <Select
            isMulti
            isSearchable={false}
            name="categories"
            // options={dropDownOptions}
            options={getUpdatedOptions(dropDownOptions, selectedCategories)}
            className="basic-multi-select"
            classNamePrefix="select"
            // onChange={handleCategoryChange}
            value={selectedCategories} // Controlled value
            onChange={handleCategoryChange} // Handle changes
          />
          <button className={styles.post} onClick={uploadPost}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
