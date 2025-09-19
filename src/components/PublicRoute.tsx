import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function PublicRoute() {
    const { isLoggedIn } = useUser();

    return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />

}