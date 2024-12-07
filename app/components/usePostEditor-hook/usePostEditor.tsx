import { useRef, useState } from "react";
import Quill, { Delta } from "quill/core";

const usePostEditor = () => {
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
    // setShowCategoriesModal(true);
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
  return  {
    postPreviewObj,
    stringifiedDelta,
    textData,
    imagePreviewArray,
    quillRef,
    quillTitleRef,
    onPublish,
    handleContentChange,
  };
}

export default usePostEditor