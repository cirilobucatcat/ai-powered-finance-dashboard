import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { logout, user } = useAuth();
  return (
    <>
      <p>Welcome, {user?.displayName}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
