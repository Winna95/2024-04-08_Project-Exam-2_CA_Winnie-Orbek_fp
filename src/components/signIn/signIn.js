import React, {useState} from 'react';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {logInUser} from "../../js/authentication-api";
import {useNavigate} from "react-router-dom";
import {setLoggedInState} from "../redux/loggedInSlice";
import {useDispatch} from "react-redux";

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

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        const successfulLogIn = await logInUser(data.email, data.password);
        if(successfulLogIn === true) {
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
                <form className="row mt-4 text-white fw-bolder" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-10 col-md-8 col-lg-6 mx-auto px-4 py-5 mt-n2 mb-5 dark-blue-bg rounded">
                        <h5 className="text-center fw-bolder">Sign in</h5>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="email" className="form-label mb-2 fw-normal">Email:</label>
                            <input {...register('email')} className="form-control"/>
                            <p>{errors.email?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="password" className="form-label mb-2 fw-normal">Password:</label>
                            <input {...register('password')} className="form-control"/>
                            <p>{errors.password?.message}</p>
                        </div>
                        {!!errorMessage ? errorMessage : <div/>}
                        <div className="text-center">
                            <button type="submit" className="btn-blue border-0 text-white px-4 py-1 rounded">Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;
