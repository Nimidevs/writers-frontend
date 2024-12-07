"use client";
import withAuth from "@/app/Auth/withAuth";
import { Categoriesmodal } from "@/app/components/categories modal/categories-modal";
import EditorComponent from "@/app/components/editor-component/editor";
import usePostEditor from "@/app/components/usePostEditor-hook/usePostEditor";
import Header from "@/app/header";
import { getToken } from "@/app/helpers/get-token-helper";
import { useParams, useRouter } from "next/navigation";
import { Delta } from "quill/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface postToUpdate {
  titleDelta: Delta;
  postDelta: Delta;
}

const UpdatePost = () => {
  const {
    postPreviewObj,
    stringifiedDelta,
    textData,
    imagePreviewArray,
    quillRef,
    quillTitleRef,
    onPublish,
  } = usePostEditor();

  const router = useRouter();

  const [postToUpdate, setPostToUpdate] = useState<postToUpdate>();
  const [currentCategories, setcurrentCategories] = useState();
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
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
        console.log(error);
        toast.error("Post to update could'nt be Fetched, Try again later");
        router.push("/");
      }
    };

    getPostToUpdate();
  }, [params.id, router]);

  const hideModal = () => {
    setShowCategoriesModal(false);
  };

  return (
    <div>
      <Header
        showWrite={false}
        onPublish={() => {
          onPublish();
          setShowCategoriesModal(true);
        }}
      />

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

export default withAuth(UpdatePost);
