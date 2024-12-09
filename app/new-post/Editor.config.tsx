"use client";
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Bounds, Delta } from "quill/core";
import Quill from "quill";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { IoCodeSlashOutline } from "react-icons/io5";

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
    const [displayButton, setDisplayButton] = useState(false);
    const [displayHandlers, setDisplayHandlers] = useState(false);
    const [bounds, setBounds] = useState<Bounds | null>(null);
    const [quillInstance, setQuillInstance] = useState<Quill | null>(null);

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
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      setQuillInstance(quill);

      if (ref && "current" in ref) {
        ref.current = quill;
      }
      const toolbar = quill.getModule("toolbar") as ToolbarModule;

      // toolbar.addHandler("image", handleInsertImage);

      if (placeholder !== "Title") {
        quill.on("selection-change", (range) => {
          if (range) {
            const bounds = quill.getBounds(range.index);
            // console.log(bounds);

            const [line] = quill.getLine(range.index);
            if (
              line &&
              line.length() === 1 &&
              Object.keys(line.formats()).length === 0
            ) {
              setDisplayButton(true);
              setBounds(bounds);
            } else {
              setDisplayButton(false);
              setBounds(null);
              setDisplayHandlers(false);
            }
          }
        });

        quill.on("text-change", () => {
          // Small delay to ensure the cursor position updates
          setTimeout(() => {
            const selection = quill.getSelection();
            if (!selection) return; // No selection, exit

            const { index } = selection;
            const bounds = quill.getBounds(index); // Get the bounds of the cursor
            const [block] = quill.getLine(index); // Get the current line

            // Check for an empty line
            if (
              block?.length() === 1 &&
              Object.keys(block.formats()).length === 0
            ) {
              setDisplayButton(true);
              setBounds(bounds);
            } else {
              setDisplayButton(false);
              setDisplayHandlers(false);
              setBounds(null);
            }
          }, 10); // Timeout ensures updated selection
        });
      }

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
        {displayButton && (
          <AddButton
            bounds={bounds}
            openHandlers={() => setDisplayHandlers(true)}
            closeHandlers={() => setDisplayHandlers(false)}
            displayHandlers={displayHandlers}
          />
        )}
        {displayHandlers && (
          <HandlersComponents bounds={bounds} quill={quillInstance} />
        )}
      </div>
    );
  }
);

const AddButton = ({
  bounds,
  openHandlers,
  closeHandlers,
  displayHandlers,
}: {
  bounds: Bounds | null;
  openHandlers: () => void;
  closeHandlers: () => void;
  displayHandlers: boolean;
}) => {
  let styles;
  if (bounds) {
    console.log(bounds);
    styles = {
      position: "absolute", // Use absolute positioning relative to the parent container
      left: bounds?.left - 40, // Move the button 40px to the left of the object's left boundary
      top: bounds?.top + bounds?.height / 1.5, // Center the button vertically
      transform: "translate(-100%, -50%)",
      zIndex: 10,
      background: "none",
      border: "none",
      fontSize: "xx-large",
      color: "grey",
    };
  }
  return bounds ? (
    <button
      style={styles}
      onClick={displayHandlers ? closeHandlers : openHandlers}
    >
      {displayHandlers ? <IoCloseCircleOutline /> : <IoAddCircleOutline />}
    </button>
  ) : null;
};

const HandlersComponents = ({
  bounds,
  quill,
}: {
  bounds: Bounds | null;
  quill: Quill | null;
}) => {
  let styles;
  let bstyles;
  if (bounds) {
    console.log(bounds);
    styles = {
      position: "absolute", // Use absolute positioning relative to the parent container
      left: bounds?.left + 140, // Move the button 40px to the left of the object's left boundary
      top: bounds?.top + bounds?.height / 1.5, // Center the button vertically
      transform: "translate(-100%, -50%)",
      zIndex: 10,
      background: "white",

      display: "flex",
      justifyContent: "space-between",
      width: "140px",
      alignItems: "center",
      padding: "10px",
      borderRadius: "8px",
      border: '1px solid grey'
    };
    bstyles = {
      background: "none",
      border: "none",
      fontSize: "large",
      color: "grey",
    };
  }

  function handleInsertImage() {
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
          imageUploadNotif = toast.loading("please wait image is uploading...");
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
            const range = quill?.getSelection();
            if (range) {
              toast.update(imageUploadNotif, {
                position: "top-center",
                render: "Image Uploaded",
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });
              quill?.insertEmbed(range.index, "image", imageUrl);
            } else {
              toast.update(imageUploadNotif, {
                position: "top-center",
                render:
                  "Please place the cursor where you want to insert the image.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
              });
            }
          } else {
            toast.update(imageUploadNotif, {
              position: "top-center",
              render: "Image failed to upload, please try again",
              type: "error",
              isLoading: false,
              autoClose: 3000,
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
              autoClose: 3000,
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
  }

  const handleInsertCodeBlock = () => {
    const range = quill?.getSelection();
    if (range) {
      quill?.insertEmbed(range.index, "code-block", ""); // Insert a blank code block at the cursor
      //quill?.setSelection(range.index + 1, 0); // Move the cursor after the code block
    }
  };
  return (
    <div style={styles}>
      <button style={bstyles} onClick={handleInsertImage}>
        <FaRegImage />
      </button>
      <button style={bstyles} onClick={handleInsertCodeBlock}>
        <IoCodeSlashOutline />
      </button>
    </div>
  );
};

Editor.displayName = "Editor";

export default Editor;
