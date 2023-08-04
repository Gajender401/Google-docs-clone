'use client'
import { useState } from "react";
import { auth, firestore } from "@/src/firebase";
import { Input } from "antd";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Modal,Button } from "antd";



const CustomButton = (props:any) => {
  const { children, ...rest } = props;

  const customStyles = {
    backgroundColor: 'white', 
    borderColor: "gray", 
    color: "black",
  };

  return (
    <Button style={customStyles} {...rest}>
      {children}
    </Button>
  );
};

export default function CreateDoc() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const router = useRouter()

  const handleOk = () => {
    createDocument();
    setIsModalOpen(false);
  };

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

      <Modal
        title="Add a Document"
        open={isModalOpen}
        footer={[
          <CustomButton key="ok" onClick={handleOk}>
            OK
          </CustomButton>,
        ]}
        onCancel={()=>setIsModalOpen(false)}
      >
        <Input
          value={title}
          onChange={(event: any) => setTitle(event?.target.value)}
          placeholder="Enter the Title"
        />
      </Modal>
    </div>
  );
}
