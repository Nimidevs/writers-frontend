"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Header from "../header";
import { Categoriesmodal } from "../components/categories modal/categories-modal";
import EditorComponent from "../components/editor-component/editor";
import withAuth from "../Auth/withAuth";
import usePostEditor from "../components/usePostEditor-hook/usePostEditor";

const NewPost = () => {
  const {
    postPreviewObj,
    stringifiedDelta,
    textData,
    imagePreviewArray,
    quillRef,
    quillTitleRef,
    onPublish,
  } = usePostEditor();
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  const hideModal = () => {
    setShowCategoriesModal(false);
  };

  return (
    <div className={styles.write}>
      <Header
        showWrite={false}
        onPublish={() => {
          onPublish();
          setShowCategoriesModal(true);
        }}
      />

      <EditorComponent titleRef={quillTitleRef} bodyRef={quillRef} />

      {showCategoriesModal && (
        <Categoriesmodal
          title={postPreviewObj.title}
          description={postPreviewObj.description}
          onclose={hideModal}
          postImage={imagePreviewArray}
          postDelta={stringifiedDelta.postDelta}
          titleDelta={stringifiedDelta.titleDelta}
          postText={textData.postText}
          titleText={textData.titleText}
        />
      )}
    </div>
  );
};

export default withAuth(NewPost);
