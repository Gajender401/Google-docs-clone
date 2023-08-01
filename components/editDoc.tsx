'use client'

import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@/components/toolbar";
import { getCurrentDoc } from "@/components/firebase";
import 'quill/dist/quill.snow.css';
import './styles.css'
import { firestore } from "@/components/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Topbar from "./topbar";
import useCheckAuth from "@/src/hook";

interface functionInterface {
  id: string;
}

export default function EditDoc({ id }: functionInterface) {
  let quillRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("")
  const [isSaving, setIsSaving] = useState("");
  const [currentDocument, setCurrentDocument] = useState({
    title: "",
    value: "",
  });

  const { userData } = useCheckAuth();


  useEffect(() => {
    setIsSaving("");
    const debounced = setTimeout(() => {
      let docSnap = doc(firestore, 'docs', id);
      updateDoc(docSnap, {
        value: value,
        title: title
      });
      setIsSaving("Saving..");
    }, 500);

    return () => {
      clearTimeout(debounced);
    };
  }, [value,title]);


  useEffect(() => {
    if (id) {
      getCurrentDoc(id, setCurrentDocument);
    }
    quillRef.current.focus();
  }, []);


  useEffect(() => {
    setValue(currentDocument?.value);
    setTitle(currentDocument?.title)
  }, [currentDocument]);



  return (
    <>
      <Topbar title={title} setTitle={setTitle} photoURL={userData?.photoURL} />
      <div className=" flex items-center flex-col">
        <div className=" mt-30 text-center w-full">
          <div className="w-[98%] m-auto" >
            <EditorToolbar />
          </div>
          <div style={{ border: "1px solid #d4d6d9" }} className="mt-5 w-[90%] h-screen m-auto">
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
    </>

  );
}
