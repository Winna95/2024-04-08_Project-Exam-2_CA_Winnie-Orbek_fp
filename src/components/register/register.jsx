import React, {useState} from 'react';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import './register.scss'
import {logInUser, registerNewUser} from "../../js/authentication-api";
import {Link, useNavigate} from "react-router-dom";
import {setLoggedInState} from "../redux/loggedInSlice";
import {useDispatch} from "react-redux";

/**
 * Validation schema for the registration form.
 * @type {yup.ObjectSchema}
 */
const schema = yup
    .object({
        name: yup
            .string()
            .required('Please enter your name'),
        email: yup
            .string()
            .email('Please enter a valid email address')
            .required('Please enter your email'),
        password: yup
            .string()
            .min(8, 'Your password must be at least 8 characters.')
            .required('please enter a password'),
        avatar: yup
            .string(),
        venueManager: yup
            .bool().required().default(true),

    })
    .required();

/**
 * Component for the registration form.
 * @returns {JSX.Element}
 */
const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Handles form submission.
     * @param {Object} data - Form data.
     */
    async function onSubmit(data) {
        console.log(data);
        const registrationErrors = await registerNewUser(data.name, data.email, data.password, data.avatar, data.venueManager);
        if (registrationErrors.length < 1) {
            const successfulLogIn = await logInUser(data.email, data.password);
            if (successfulLogIn === true) {
                dispatch(setLoggedInState(true));
                navigate("/");
            } else {
                setErrorMessage("Failed to log in")
            }
        } else {
            setErrorMessage("Failed to register due to: " + registrationErrors.join(", "))
        }

    }

    return (
        <div>
            <div className="container">
                <form className="row mt-4 fw-medium" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-10 col-md-8 col-lg-6 mx-auto px-4 py-5 mt-n2 mb-5 form-bg rounded-0 shadow">
                        <h5 className="text-center fw-bolder">Register user</h5>
                        <div className="mb-3 col-10 mx-auto">
                            <label htmlFor="name" className="form-label mb-2 fw-normal">Name:</label>
                            <input {...register('name')} className="form-control shadow rounded-0"/>
                            <p className="error">{errors.name?.message}</p>
                        </div>
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
                        <div className="mb-3 col-10 mx-auto">
                            <label htmlFor="avatar" className="form-label mb-2 fw-normal">Avatar Url:</label>
                            <input {...register('avatar')} className="form-control shadow rounded-0"/>
                        </div>
                        <div className="mb-3 col-10 mx-auto">
                            <label htmlFor="customerManager" className="form-label mb-2 fw-normal">Is manager(else is
                                customer):
                            </label>
                            <input type={"checkbox"} {...register('venueManager')} defaultChecked={true}
                                   className="form-check-input"/>
                        </div>
                        <div className="error">{!!errorMessage ? errorMessage : <div/>}</div>
                        <div className="text-left ms-5">
                            <button type="submit"
                                    className="btn-blue border-0 text-white px-5 py-2 fw-medium rounded-0">Register
                            </button>
                        </div>
                        <div className="ms-5 mt-5">
                            <p className="fw-light mb-1">Already have a user?</p>
                            <Link to="/signin" className="fw-light text-black">Log In here</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
