import { Button, Flex } from "@chakra-ui/react";
import {useState, useEffect} from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [callbackUrl, setCallbackUrl] = useState("/");
  const router = useRouter();

  useEffect(() => {
    const storedCallbackUrl = localStorage.getItem("callbackUrl");
    if (storedCallbackUrl) {
      setCallbackUrl(storedCallbackUrl);
      localStorage.removeItem("callbackUrl");
    }
  }, []);

  const handleSignIn = async () => {
    const result = await signIn("google", { callbackUrl });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.100">
      <Button onClick={handleSignIn}>Sign in with Google</Button>  
   
    </Flex>
  );
}
