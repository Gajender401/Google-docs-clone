'use client'

import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@/components/toolbar";
import { editDoc, getCurrentDoc } from "@/components/firebase";
import { Input } from "antd";
import 'quill/dist/quill.snow.css';
import './styles.css'

interface functionInterface {
  id: string;
  handleEdit: () => void;
}

export default function EditDoc({ id }: functionInterface) {
  let quillRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState("");
  const [currentDocument, setCurrentDocument] = useState({
    title: "",
    value: "",
  });
  function editDocument() {
    let payload = {
      value,
      title,
    };
    editDoc(payload, id);
    setIsSaving("Saving..");
  }

  const getCurrentDocument = () => {
    if (id) {
      getCurrentDoc(id, setCurrentDocument);
    }
  };

  useEffect(() => {
    setIsSaving("");
    const debounced = setTimeout(() => {
      editDocument();
    }, 500);

    return () => {
      clearTimeout(debounced);
    };
  }, [value, title]);

  useEffect(() => {
    getCurrentDocument();
    quillRef.current.focus();
  }, []);

  useEffect(() => {
    setTitle(currentDocument?.title);
    setValue(currentDocument?.value);
  }, [currentDocument]);

  return (
    <div className=" flex items-center flex-col">
      {/* <p className="saving-conf">{isSaving}</p> */}
      <Input
        value={title}
        className=" bg-transparent outline-none border border-gray-300 text-gray-800 w-90"
        onChange={(event: any) => setTitle(event?.target.value)}
        placeholder="Enter the Title"
      />
      <div className=" mt-30 text-center w-full">
        <div className="w-[98%] m-auto" >
          <EditorToolbar />
        </div>
        <div style={{border:"1px solid #d4d6d9"}} className="mt-5 w-[90%] h-screen m-auto">
          <ReactQuill
            className="react-quill"
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>

      </div>
    </div>
  );
}
