import React, {useState} from 'react';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import './register.scss'
import {logInUser, registerNewUser} from "../../js/authentication-api";
import {Link, useNavigate} from "react-router-dom";

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

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        console.log(data);
        const registrationErrors = await registerNewUser(data.name, data.email, data.password, data.avatar, data.venueManager);
        if(registrationErrors.length < 1) {
            const successfulLogIn = await logInUser(data.email, data.password);
            if(successfulLogIn === true) {
                // Redirect to the venue page on successful login

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
                <form className="row mt-4 text-white fw-bolder" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-10 col-md-8 col-lg-6 mx-auto px-4 py-5 mt-n2 mb-5 dark-blue-bg rounded">
                        <h5 className="text-center fw-bolder">Register user</h5>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="name" className="form-label mb-2 fw-normal">Name:</label>
                            <input {...register('name')} className="form-control"/>
                            <p>{errors.name?.message}</p>
                        </div>
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
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="avatar" className="form-label mb-2 fw-normal">Avatar Url:</label>
                            <input {...register('avatar')} className="form-control"/>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="customerManager" className="form-label mb-2 fw-normal">Is manager(else is
                                customer):</label>
                            <input type={"checkbox"} {...register('venueManager')} defaultChecked={true}
                                   className="form-check-input"/>
                        </div>
                        {!!errorMessage ? errorMessage : <div/>}
                        <div className="text-center">
                            <button type="submit" className="btn-blue border-0 text-white px-4 py-1 rounded">Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
