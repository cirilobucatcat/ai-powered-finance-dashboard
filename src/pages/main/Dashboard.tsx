import SEO from "@/components/Seo";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { logout, user } = useAuth();
  return (
    <>
      <SEO 
          title="Dashboard" 
          description="Finebird Dashboard"
          name="Finebird"
          type="website"
      />
      <p>Welcome, {user?.displayName}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
