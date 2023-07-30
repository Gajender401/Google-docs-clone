'use client'
import { useState } from "react";
import EditDoc from "@/components/editDoc";
import { createDoc } from "@/components/firebase";
import CommonModal from "@/components/modal";
import { Input } from "antd";
import Image from "next/image";

type isEditType = {
  isEdit: boolean;
  handleEdit: () => void;
  id: string;
};

export default function CreateDoc({ isEdit, handleEdit, id }: isEditType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const createDocument = () => {
    let payload = {
      title: title,
      value: "",
    };
    createDoc(payload);
  };

  if (isEdit) return <EditDoc handleEdit={handleEdit} id={id} />;
  return (
    <div className=" bg-[#f1f3f4] flex justify-center">
      <div className="py-6">
        <p className="mb-4" >Start a new document</p>
        <Image
          className=" cursor-pointer border border-gray-300 rounded-[3px]"
          src='/addDoc.png'
          onClick={() => {
            // handleEdit();
            setTitle("");
            setIsModalOpen(true);
          }}
          height={170}
          width={130}
          alt="add"
        />
        <p className=" mt-2">Blank</p>
      </div>

      <CommonModal
        createDocument={createDocument}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <Input
          value={title}
          onChange={(event:any) => setTitle(event?.target.value)}
          placeholder="Enter the Title"
        />
      </CommonModal>
    </div>
  );
}
