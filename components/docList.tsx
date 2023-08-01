'use client'

import { getDocuments } from "@/components/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function DocsList() {
  const [docs, setDocs] = useState([
    {
      title: "",
      id: "",
      userName: "",
      value: "",
    },
  ]);

  const router = useRouter()

  const getDocs = async () => {
    await getDocuments(setDocs);
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <div className=" px-[60px] grid grid-cols-4 gap-10 justify-center">
      {docs.map((doc) => {
        return (
          <div
            onClick={() => router.push(`document/${doc.id}`)}
            className=" h-[250px] w-[200px]  mt-10 cursor-pointer border relative border-gray-300"
          >
            <p
              className="text-xs text-center p-2"
              dangerouslySetInnerHTML={{
                __html: `${doc.value.substring(0, 100)}`,
              }}
            ></p>

            <p className="w-full p-3 flex absolute bottom-0 justify-center items-center gap-5 text-sm bg-white p-0 m-0 border-t border-gray-300 font-semibold">
              <Image width={25} height={25} src='/docsIcon.png' alt="Document icon" />
              {doc.title.length > 17
                ? `${doc.title.substring(0, 17)}...`
                : doc.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
