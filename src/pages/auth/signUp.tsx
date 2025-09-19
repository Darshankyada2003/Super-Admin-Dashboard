import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    // const navigate = useNavigate();

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        loading: false,
        error: "",
        success: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setRegister((prev) => ({
            ...prev, error: "", loading: true, success: ""
        }));

        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/register", {
                username: register.name,
                email: register.email,
                password: register.password
            });

            setRegister((prev) => ({
                ...prev,
                success: response.data?.message || "Registration successful"
            }))

            // navigate("/signin");
        } catch (err: any) {

            const errorMsg = err.response?.data?.detail;
            setRegister((prev) => ({
                ...prev,
                error: errorMsg || "Registration failed"
            }))
        } finally {
            setRegister((prev) => ({
                ...prev,
                loading: false
            }))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-white to-purple-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account ✨
                </h2>
                {register.success && (
                    <p className="text-green-500 text-center text-sm mb-4">{register.success}</p>
                )}
                {register.error && (
                    <p className="text-red-500 text-center text-sm mb-4">{register.error}</p>
                )}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            name="name"
                            onChange={handleChange}
                            value={register.name}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            name="email"
                            onChange={handleChange}
                            value={register.email}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            name="password"
                            onChange={handleChange}
                            value={register.password}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={register.loading}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                    >
                        {register.loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-sm text-center mt-5 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-purple-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
