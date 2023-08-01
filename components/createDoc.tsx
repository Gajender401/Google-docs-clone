'use client'
import { useState } from "react";
import { auth, firestore } from "@/components/firebase";
import CommonModal from "@/components/modal";
import { Input } from "antd";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreateDoc() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const router = useRouter()


  const createDocument = async () => {

    const docRef = await addDoc(collection(firestore, "docs"), {
      title: title,
      value: "",
      userId: auth.currentUser?.uid,
      userName: auth.currentUser?.displayName,
    });

    router.push(`/document/${docRef.id}`)

  };

  return (
    <div className=" bg-[#f1f3f4] flex justify-center">
      <div className="py-6">
        <p className="mb-4" >Start a new document</p>
        <Image
          className=" cursor-pointer border border-gray-300 rounded-[3px]"
          src='/addDoc.png'
          onClick={() => {
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
          onChange={(event: any) => setTitle(event?.target.value)}
          placeholder="Enter the Title"
        />
      </CommonModal>
    </div>
  );
}
