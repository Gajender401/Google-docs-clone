'use client'
import { loginWithGoogle } from "@/src/firebase";
import useCheckAuth from "@/src/hook";
import Document from "@/components/documents";
import {FcGoogle} from 'react-icons/fc'

const Docs: React.FC = () => {

  let { isAuthenticated, userData } = useCheckAuth();
  
  return (
    <>
      {!isAuthenticated ? (
        <div className="flex h-screen w-screen items-center justify-center">
            <button onClick={()=> loginWithGoogle()} className="border-sky-500 p-1 flex flex-row items-center " >
              <FcGoogle size={18} />
                Login
            </button>
        </div>
      ) : (
        <>
          <Document photoURL={userData?.photoURL} />
        </>
      )}
    </>
  );
};

export default Docs;
