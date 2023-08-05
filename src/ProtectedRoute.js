"use client"
import { useRouter } from 'next/navigation';
import { auth } from "./firebase";

const ProtectedRoutes = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

      if (!auth?.currentUser) {
        router.replace('/'); // Redirect to unauthorized page or any other route
      }

    // Render the wrapped component if authorized
    return auth?.currentUser
    ?<WrappedComponent {...props} /> 
    :<div style={{display:'flex',alignItems:"center",justifyContent:"center",height:"100vh"}} >Not Authorized</div>;
  };

  return Wrapper;
};

export default ProtectedRoutes;