'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Dropdown } from "antd";
import { firestore,auth } from '@/src/firebase'
import { doc, deleteDoc, collection } from "firebase/firestore";
import {onSnapshot,query,where} from "firebase/firestore";

interface Document {
  title: string;
  id: string;
  userName: string;
  value: string;
}

export default function DocsList() {

  const [docs, setDocs] = useState<Document[]>([]);

  const router = useRouter()

  const deleteItem = async (docId: string) => {
    await deleteDoc(doc(firestore, "docs", docId));
  }

  const getDocs = async () => {
    const docRef = query(collection(firestore, "docs"), where("userId", "==", auth.currentUser?.uid));
    onSnapshot(docRef, (res) => {
      setDocs(
        res.docs.map((doc) => {
          const data = doc.data() as Document;
          return { ...data, id: doc.id };
        })
      );
    });
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <div className=" px-[60px] grid grid-cols-4 gap-10 justify-center">
      {docs.map((doc) => {
        return (
          <div
            className=" h-[250px] w-[200px]  mt-10 cursor-pointer border relative border-gray-300"
          >
            <p
              className="text-xs text-center p-2"
              dangerouslySetInnerHTML={{
                __html: `${doc.value.substring(0, 100)}`,
              }}
            ></p>

            <div
              onClick={() => router.push(`document/${doc.id}`)}
              className="absolute z-10 h-[200px] top-0 w-full" 
            />

            <p className="w-full p-3 flex absolute bottom-0 items-center justify-between text-sm bg-white border-t border-gray-300 ">
              <div
                className="flex gap-2 items-center"
              >

                <Image width={25} height={25} src='/docsIcon.png' alt="Document icon" />

                {doc.title.length > 17
                  ? `${doc.title.substring(0, 17)}...`
                  : doc.title
                }
              </div>

              <Dropdown placement="bottomRight" menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <p onClick={() => deleteItem(doc.id)} className="menu-item" >
                        Delete
                      </p>
                    ),
                  },
                ],
              }}>
                <BsThreeDotsVertical size={20} color="grey" />
              </Dropdown>
            </p>

          </div>
        );
      })}
    </div>
  );
}
