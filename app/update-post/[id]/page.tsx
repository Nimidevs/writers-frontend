"use client";
import { Categoriesmodal } from "@/app/components/categories modal/categories-modal";
import EditorComponent from "@/app/components/editor-component/editor";
import Header from "@/app/header";
import { getToken } from "@/app/helpers/get-token-helper";
import { useParams } from "next/navigation";
import Quill, { Delta } from "quill/core";
import { useEffect, useRef, useState } from "react";

interface postToUpdate {
  titleDelta: Delta;
  postDelta: Delta;
}

const UpdatePost = () => {
  const [postToUpdate, setPostToUpdate] = useState<postToUpdate>();
  const [currentCategories, setcurrentCategories] = useState();
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [postPreviewObj, setPostPreviewObj] = useState({
    title: "",
    description: "",
  });
  const [stringifiedDelta, setStringifiedDelta] = useState({
    postDelta: "",
    titleDelta: "",
  });
  const [textData, setTextData] = useState({
    postText: "",
    titleText: "",
  });
  const [imagePreviewArray, setImagePreviewArray] = useState<string[]>([]);
  const quillRef = useRef<Quill | null>();
  const quillTitleRef = useRef<Quill | null>();
  const params = useParams();
  useEffect(() => {
    const getPostToUpdate = async () => {
      const token = getToken();
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${params.id}/update`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.statusText}`);
        }
        const data = await response.json();
        setPostToUpdate({
          titleDelta: JSON.parse(data.post.title),
          postDelta: JSON.parse(data.post.post),
        });
        setcurrentCategories(data.post.categories);
      } catch (error) {
        console.log("there was an error getting post");
      }
    };

    getPostToUpdate();
  }, [params.id]);

  const onPublish = () => {
    const postDeltaJson = JSON.stringify(quillRef?.current?.getContents());

    const titleDeltaJson = JSON.stringify(quillTitleRef.current?.getContents());

    const post_Text = quillRef.current?.getText();
    const title_Text = quillTitleRef.current?.getText();

    const title_preview = `${title_Text}`;
    const subtitle_preview = `${post_Text?.substring(0, 200)}`;
    setPostPreviewObj({ title: title_preview, description: subtitle_preview });

    setStringifiedDelta({
      postDelta: postDeltaJson,
      titleDelta: titleDeltaJson,
    });
    setTextData({
      postText: `${post_Text}`,
      titleText: `${title_Text}`,
    });
    handleContentChange();
    setShowCategoriesModal(true);
  };

  const hideModal = () => {
    setShowCategoriesModal(false);
  };
  const getImageUrlsFromContent = (delta: Delta): string[] => {
    return delta.ops
      .map((op) => {
        // Check if op.insert is an object and contains the "image" key
        if (
          typeof op.insert === "object" &&
          op.insert !== null &&
          "image" in op.insert
        ) {
          return (op.insert as { image: string }).image;
        }
        return null;
      })
      .filter((url): url is string => url !== null); // Filter out null values
  };

  const handleContentChange = () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      const imageUrls = getImageUrlsFromContent(delta);
      setImagePreviewArray(imageUrls);
    }
  };

  return (
    <div>
      <Header showWrite={false} onPublish={onPublish} />

      <EditorComponent
        titleRef={quillTitleRef}
        bodyRef={quillRef}
        content={postToUpdate}
      />

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
          update={true}
          id={`${params.id}`}
          existingCategories={currentCategories}
        />
      )}
    </div>
  );
};

export default UpdatePost;
