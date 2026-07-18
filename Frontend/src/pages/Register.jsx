import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";

import useAuth from "../hooks/useAuth";

const Register = () => {

    const { register } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

        confirmPassword: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(formData.password !== formData.confirmPassword){

            toast.error("Passwords do not match");

            return;

        }

        try{

            setLoading(true);

           await register({
    username: formData.username,
    email: formData.email,
    password: formData.password,
});

toast.success("Account Created Successfully");

navigate("/login");

            navigate("/login");

        }

        catch(error){

    toast.error(
        error.response?.data?.message ||
        "Registration Failed"
    );

}

        finally{

            setLoading(false);

        }

    };

    return(

        <AuthLayout>

            <p
                className="uppercase tracking-[0.45em] text-gray-500 text-sm"
                style={{
                    fontFamily:"IBM Plex Mono"
                }}
            >
                SIGN UP
            </p>

            <h1
                className="text-6xl mt-5"
                style={{
                    fontFamily:"General Sans SemiBold"
                }}
            >
                Create your account.
            </h1>

            <p className="text-gray-500 text-2xl mt-6 mb-16">

                Already a member?

                <Link
                    to="/login"
                    className="underline text-black ml-2"
                >

                    Sign in

                </Link>

            </p>

            <form onSubmit={handleSubmit}>

                <AuthInput
                    label="Full Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <AuthInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-6">

                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        label="Confirm"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                </div>

                <AuthButton
                    loading={loading}
                    type="submit"
                >

                    Create account

                </AuthButton>

            </form>

        </AuthLayout>

    );

};

export default Register;