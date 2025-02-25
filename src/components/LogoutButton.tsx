import { useAuth } from "../context/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      className="bg-black hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
      onClick={logout}
    >
      Logout
    </button>
  );
};
