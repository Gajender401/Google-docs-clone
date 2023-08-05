'use client'

import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@/components/toolbar";
import 'quill/dist/quill.snow.css';
import './styles.css'
import { firestore } from "@/src/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Topbar from "./topbar";
import useCheckAuth from "@/src/hook";
import { onSnapshot } from "firebase/firestore";


export default function EditDoc({ id }: {id:string}) {
  let quillRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("")
  const [currentDocument, setCurrentDocument] = useState<any>({
    title: "",
    value: "",
  });
  const [state, setState] = useState(false)

  const { userData } = useCheckAuth();


  const getCurrentDoc = async (id: string) => {
    const docRef = doc(firestore, "docs", id);
    await onSnapshot(docRef, (doc) => {
      setCurrentDocument(doc.data());
    });
  };


  useEffect(() => {
    if (state) {
      const debounced = setTimeout(() => {
        const docSnap = doc(firestore, 'docs', id);
        updateDoc(docSnap, {
          value: value,
          title: title
        });
      }, 500);

      return () => {
        clearTimeout(debounced);
      };
    }

  }, [value, title, id]);


  useEffect(() => {
    if (id) {
      getCurrentDoc(id);
      setState(true)
    }
    quillRef.current.focus();
  }, [id]);


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
