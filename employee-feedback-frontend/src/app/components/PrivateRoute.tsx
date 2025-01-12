import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  user: { isLoggedIn: boolean; role: string } | null;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, children }) => {
  const router = useRouter();

  useEffect(() => {

   
    if (user?.role === "employee") {
      router.replace("/unauthorized");
    }
  }, [user]);

  // Render children only if the user is authorized
  if (user?.role === "employee") {
    return null; // Prevent rendering unauthorized content
  }

  return <>{children}</>;
};

export default PrivateRoute;
