'use client'

import CommonDropdown from "@/components/dropdown";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "antd";

interface TopbarProps {
  photoURL: string;
  title?: string,
  setTitle?: any
}

export default function Topbar({ photoURL, title, setTitle }: TopbarProps) {

  const pathname = usePathname()
  const path = pathname.split('/')[1]


  return (
    <div className=" bg-white flex items-center justify-between py-3 px-5 ">
      <div className=" flex items-center space-x-15">
        <Link href='/'>
          <Image
            className="cursor-pointer"
            src='/docsIcon.png'
            alt="img"
            height={35}
            width={35}
          />
        </Link>

        {path === 'document'
          ?
          <input
            value={title}
            className="inline-block px-1 outline-sky-500"
            onChange={(event: any) => setTitle(event?.target.value)}
          />
          :
          <p className="text-24">Docs</p>

        }


      </div>
      <CommonDropdown>
        <Image className="rounded-full" height={35} width={35} src={photoURL} alt="user" />
      </CommonDropdown>

    </div>
  );
}
