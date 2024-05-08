import React, {useState} from 'react';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {logInUser} from "../../js/authentication-api";
import {Link, useNavigate} from "react-router-dom";
import {setLoggedInState} from "../redux/loggedInSlice";
import {useDispatch} from "react-redux";

/**
 * @typedef {Object} SignInData - Data structure for sign-in form inputs.
 * @property {string} email - User's email address.
 * @property {string} password - User's password.
 */

/**
 * SignInForm component renders a sign-in form.
 * @returns {JSX.Element} JSX element containing the sign-in form.
 */
const schema = yup
    .object({
        email: yup
            .string()
            .email('Please enter a valid email address')
            .required('Please enter your email'),
        password: yup
            .string()
            .required('please enter a password'),

    })
    .required();

const SignInForm = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    /**
     * React Hook Form configuration.
     * @type {import('react-hook-form').UseFormReturn<SignInData>}
     */
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Handles form submission.
     * @param {SignInData} data - Form data containing email and password.
     * @returns {Promise<void>} Promise indicating success or failure of form submission.
     */
    async function onSubmit(data) {
        const successfulLogIn = await logInUser(data.email, data.password);
        if (successfulLogIn === true) {
            dispatch(setLoggedInState(true));
            // Redirect to the venue page on successful login
            navigate("/");
        } else {
            setErrorMessage("Failed to log in")
        }
    }

    return (
        <div>
            <div className="container">
                <form className="row mt-4 fw-medium" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-10 col-md-8 col-lg-6 mx-auto px-4 py-5 mt-n2 mb-5 form-bg rounded-0 shadow">
                        <h5 className="text-center fw-bolder">Sign in</h5>
                        <div className="mb-3 col-10 mx-auto">
                            <label htmlFor="email" className="form-label mb-2 fw-normal">Email:</label>
                            <input {...register('email')} className="form-control shadow rounded-0"/>
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="mb-3 col-10 mx-auto">
                            <label htmlFor="password" className="form-label mb-2 fw-normal">Password:</label>
                            <input {...register('password')} className="form-control shadow rounded-0" type="password"/>
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        <div className="error">{!!errorMessage ? errorMessage : <div/>}</div>
                        <div className="text-left ms-5 mt-4">
                            <button type="submit"
                                    className="btn-blue border-0 text-white px-5 py-1 rounded-0 fw-medium">Sign in
                            </button>
                        </div>
                        <div className="ms-5 mt-5">
                            <p className="fw-light mb-1">Don't have a user?</p>
                            <Link to="/register" className="fw-light text-black">Register here</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;
