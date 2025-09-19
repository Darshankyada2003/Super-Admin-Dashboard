import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function ProtectedRoute() {
    const { isLoggedIn } = useUser();

    return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />

}