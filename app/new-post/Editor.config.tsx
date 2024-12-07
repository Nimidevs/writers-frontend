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
import { toast } from "react-toastify";

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
              toast.error("File is too large, ensure file is below 7mb", {
                position: "top-center",
              });
              return;
            }

            const formData = new FormData();
            formData.append("image", file);
            let imageUploadNotif;

            try {
              console.log(formData);
              imageUploadNotif = toast.loading(
                "please wait image is uploading..."
              );
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
                  toast.update(imageUploadNotif, {
                    position: "top-center",
                    render: "Image Uploaded",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000
                  });
                  quill.insertEmbed(range.index, "image", imageUrl);
                } else {
                  toast.update(imageUploadNotif, {
                    position: "top-center",
                    render:
                      "Please place the cursor where you want to insert the image.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                  });
                }
              } else {
                toast.update(imageUploadNotif, {
                  position: "top-center",
                  render: "Image failed to upload, please try again",
                  type: "error",
                  isLoading: false,
                  autoClose: 3000
                });
                throw new Error("Image upload failed.");
              }
            } catch (error) {
              if (imageUploadNotif) {
                toast.update(imageUploadNotif, {
                  position: "top-center",
                  render: "An error occurred while uploading the image.",
                  type: "error",
                  isLoading: false,
                  autoClose: 3000
                });
              } else {
                toast.error(
                  "An error occurred while uploading the image. Please try again.",
                  {
                    position: "top-center",
                  }
                );
              }
            } finally {
              
            }
          } else {
            toast.error("Invalid file type, Please select an Image", {
              position: "top-center",
            });
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
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
