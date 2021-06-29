import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';



export default function Login() {

    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [loginState, setLoginState] = useState({
        name: '',
        password: ''
    })

    function handleInput(e) {
        const { name, value } = e.target;
        setLoginState({ ...loginState, [name]: value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(loginState);
        try {
            const { data } = await login({
                variables: { ...loginState },
            });
            console.log(data)
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setLoginState({
            email: '',
            password: '',
        });
    };



    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Login</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="name"
                                    type="name"
                                    value={loginState.name}
                                    onChange={handleInput}
                                />
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={loginState.password}
                                    onChange={handleInput}
                                />
                                <button
                                    className="btn btn-block btn-info"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
