import Editor from "@/app/new-post/Editor.config";
import "../../../node_modules/quill/dist/quill.bubble.css";
import Quill, { Delta } from "quill/core";
import styles from "./styles.module.css";
import { MutableRefObject, useEffect } from "react";

interface EditorCompProps {
  titleRef: MutableRefObject<Quill | null | undefined>;
  bodyRef: MutableRefObject<Quill | null | undefined>;
  content?: {
    titleDelta: Delta;
    postDelta: Delta;
  };
}

const EditorComponent = ({ titleRef, bodyRef, content }: EditorCompProps) => {
  useEffect(() => {
    if (content) {
      titleRef.current?.setContents(content?.titleDelta);
      bodyRef.current?.setContents(content?.postDelta);
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.titleEditorContainer}>
        <Editor
          className={styles.titleEditor}
          ref={titleRef}
          placeholder="Title"
          defaultValue={new Delta()}
        />
      </div>

      <div className={styles.editorContainer}>
        <Editor
          ref={bodyRef}
          placeholder="Tell your story..."
          defaultValue={new Delta()}
          className={styles.postEditor}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
