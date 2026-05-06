import GuestHome from "@/src/components/home/GuestHome";
import LoggedHome from "@/src/components/home/LoggedHome";
import { useAuth } from "@/src/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  if (user) {
    return <LoggedHome user={user} />;
  }
  
  return <GuestHome />;
}