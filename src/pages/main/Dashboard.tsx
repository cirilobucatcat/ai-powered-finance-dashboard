import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <p>Dashboard</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
