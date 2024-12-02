"use client";
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Delta } from "quill/core";
import Quill from "quill";
import styles from "./page.module.css";

interface EditorProps {
  defaultValue: Delta; // Type for Delta
  className: string;
  placeholder?: string;
}

interface ToolbarModule {
  addHandler: (name: string, callback: () => void) => void;
  getHandler: (name: string) => Function | undefined;
}

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ defaultValue, className, placeholder }: EditorProps, ref) => {
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);

    useEffect(() => {
      const container = containerRef.current;

      if (!container) return;

      const editorContainer = container?.appendChild(
        container.ownerDocument.createElement("div")
      );

      // Initialize Quill with the Bubble theme and Medium-like toolbar
      const quill = new Quill(editorContainer, {
        placeholder: placeholder,
        theme: "bubble",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "blockquote"],
            ["link", "image", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      if (ref && "current" in ref) {
        ref.current = quill;
      }
      const toolbar = quill.getModule("toolbar") as ToolbarModule;
      // console.log(toolbar);
      toolbar.addHandler("image", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        console.log(input);

        input.onchange = async () => {
          const file = input.files?.[0];
          console.log(file);

          if (file && /^image\//.test(file.type)) {
            const tokenString = localStorage.getItem("token");
            const token = tokenString ? JSON.parse(tokenString) : null;

            if (file?.size > 7 * 1024 * 1024) {
              setErrorMessage("File is too large, ensure file is below 7mb");
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
              return;
            }

            const formData = new FormData();
            formData.append("image", file);

            try {
              console.log(formData);
              setIsUploading(true);
              const response = await fetch(
                `http://localhost:8080/api/posts/image/upload`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `${token}`,
                  },
                  body: formData,
                }
              );
              console.log(response);
              const data = await response.json();
              console.log(data);
              const imageUrl = data.image_url;
              if (imageUrl) {
                const range = quill.getSelection();
                if (range) {
                  quill.insertEmbed(range.index, "image", imageUrl);
                } else {
                  setErrorMessage(
                    "Please place the cursor where you want to insert the image."
                  );
                  setTimeout(() => setErrorMessage(null), 3000);
                }
              } else {
                throw new Error("Image upload failed.");
              }
            } catch (error) {
              if (error instanceof Error) {
                setErrorMessage(
                  error.message || "Upload failed. Please try again."
                );
              } else {
                setErrorMessage("An unknown error occurred.");
              }
              setTimeout(() => setErrorMessage(null), 3000);
            } finally {
              setIsUploading(false);
            }
          } else {
            setErrorMessage("Invalid file type. Please select an image.");
            setTimeout(() => setErrorMessage(null), 3000);
          }
        };

        input.click();
      });


      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }
      if (className) {
        quill.root.classList.add(className);
      }
      return () => {
        if (ref && "current" in ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref, className, placeholder]);

    return (
      <div className={styles.editor} ref={containerRef}>
        {isUploading && (
          <div className={styles.loadingOverlay}>Uploading please wait....</div>
        )}
        {errorMessage && (
          <div className={styles.overlay}>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
