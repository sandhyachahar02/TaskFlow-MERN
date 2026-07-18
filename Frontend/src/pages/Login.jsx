import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        email: "",

        password: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await login(formData);

toast.success("Login Successful");

navigate("/dashboard");

        }

       catch (error) {

    toast.error(
        error.response?.data?.message ||
        "Login Failed"
    );

}

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <p

                className="uppercase tracking-[0.45em] text-gray-500 text-sm"

                style={{

                    fontFamily:"IBM Plex Mono"

                }}

            >

                SIGN IN

            </p>

            <h1

                className="text-7xl leading-none"

                style={{

                    fontFamily:"General Sans SemiBold"

                }}

            >

                Welcome back.

            </h1>

            <p className="text-gray-500 text-xl mt-8">

                New here?

                <Link

                    to="/register"

                    className="text-black underline ml-2"

                >

                    Create an account

                </Link>

            </p>

            <form onSubmit={handleSubmit}>

                <AuthInput

                    label="Email"

                    name="email"

                    type="email"

                    value={formData.email}

                    onChange={handleChange}

                />

                <PasswordInput

                    label="Password"

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                />

                <AuthButton

                    loading={loading}

                    type="submit"

                >

                    Sign in

                </AuthButton>

            </form>

        </AuthLayout>

    );

};

export default Login;