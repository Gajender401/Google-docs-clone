'use client'

import Topbar from "@/components/topbar";
import CreateDoc from "@/components/createDoc";
import DocsList from "@/components/docList";


interface TopbarProps {
    photoURL: string;
    setIsEdit?: Function;
  }
export default function Documents({ photoURL }: TopbarProps) {

  return (
    <div>
      <Topbar photoURL={photoURL} />
      <CreateDoc/>
      <DocsList />
    </div>
  );
}
