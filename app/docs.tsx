'use client'
import { loginWithGoogle } from "@/components/firebase";
import useCheckAuth from "@/src/hook";
import Document from "@/components/documents";

const Docs: React.FC = () => {
  const handleLogin = () => {
    loginWithGoogle();
  };
  let { isAuthenticated, userData } = useCheckAuth();
  return (
    <>
      {!isAuthenticated ? (
        <div className="docs-container">
            <button onClick={handleLogin} className="flex items-center justify-center h-screen" >
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
