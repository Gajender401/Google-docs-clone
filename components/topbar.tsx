'use client'

import CommonDropdown from "@/components/dropdown";
import Image from "next/image";

interface TopbarProps {
    photoURL: string;
    setIsEdit?: Function;
}

export default function Topbar({ photoURL, setIsEdit }: TopbarProps) {
  return (
    <div className=" bg-white flex items-center justify-between py-3 px-5 ">
      <div className=" flex items-center space-x-15">
        <Image
          className="cursor-pointer"
          src='/docsIcon.png'
          onClick={() => setIsEdit(false)}
          alt="img"
          height={35}
          width={35}
        />
        <p className="text-24">Docs</p>
        
      </div>
        <CommonDropdown>
          <Image className="rounded-full" height={35} width={35} src={photoURL} alt="user" />
        </CommonDropdown>

    </div>
  );
}
