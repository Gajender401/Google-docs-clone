'use client'

import { useState } from "react";
import Topbar from "@/components/topbar";
import CreateDoc from "@/components/createDoc";
import DocsList from "@/components/docList";


interface TopbarProps {
    photoURL: string;
    setIsEdit?: Function;
  }
export default function Documents({ photoURL }: TopbarProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");

  const openDoc = (id: string) => {
    setIsEdit(!isEdit);
    setId(id);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      <Topbar photoURL={photoURL} setIsEdit={setIsEdit} />
      <CreateDoc id={id} isEdit={isEdit} handleEdit={handleEdit} />
      {isEdit ? <></> : <DocsList openDoc={openDoc} />}
    </div>
  );
}
