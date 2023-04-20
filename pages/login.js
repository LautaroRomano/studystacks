import { Button, Flex } from "@chakra-ui/react";
import {useState, useEffect} from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {

  const [error, setError] = useState(null)
  const [callbackUrl , setCallbackUrl] = useState("/")
  const router = useRouter();

  useEffect(()=>{
    sessionStorage.setItem("callbackUrl", router.asPath);
  }, [router.asPath])

  const handleSignIn = async () => {
    // signIn("google");
  // const result = await signIn('google',  { callbackUrl: "/newpost" });
  //
  const callbackUrl = sessionStorage.getItem("callbackUrl") || "/";
  const result = await signIn('google',  { callbackUrl});
  
  if(result?.error){
      setError(result.error)
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.100">
      <Button onClick={handleSignIn}>Sign in with Google</Button>  
      {error && <p>{error}</p>}
    </Flex>
  );
}
