import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function SignIn() {
    const { login } = useUser();
    const navigate = useNavigate();

    const [state, SetState] = useState({
        email: "",
        password: "",
        loading: false,
        error: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        SetState((prev) => ({
            ...prev, error: "", loading: true
        }));
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/login", {
                email: state.email,
                password: state.password
            });

            const { access_token, user } = response.data;
                
            login(access_token, user);
            navigate("/");
        } catch (err: any) {
            const errorMsg = err.response?.data?.detail;
            SetState((prev) => ({
                ...prev,
                error: errorMsg || "Login failed"
            }))
        } finally {
            SetState((prev) => ({
                ...prev,
                loading: false
            }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>

                {state.error && (
                    <p className="text-red-500 text-center text-sm mb-4">{state.error}</p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            name="password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={state.loading}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        {state.loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <p className="text-sm text-center mt-5 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
