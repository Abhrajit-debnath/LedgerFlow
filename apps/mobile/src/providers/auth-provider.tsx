import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const segments = useSegments();
    
    const [isAuthenticated, setIsAuthenticated] = useState(true); 

    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';

      if (!isAuthenticated && !inAuthGroup) {
        router.replace("/(auth)/login");
      } else if (isAuthenticated && inAuthGroup) {
        router.replace("/(home)/dashboard");
      }
    }, [isAuthenticated, segments]); 


    return children;
}

export default AuthProvider;