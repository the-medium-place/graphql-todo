import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ONE_USER, GET_ME } from '../../utils/queries';
import { useParams } from 'react-router';
import NewTodoForm from '../../components/NewTodoForm';
import Auth from '../../utils/auth';


export default function UserPage() {

    const params = useParams();
    // console.log(params)
    const userId = params.id

    const [userData, setUserData] = useState(null)

    const { loading, error, data } = useQuery(
        userId ? GET_ONE_USER : GET_ME,
        {
            variables: { userId },
        }
    );

    // const { loading, error, data } = useQuery(GET_ONE_USER, {
    //     variables: { userId }
    // });
    if (error) { console.log(error) }

    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const loggedInUser = data?.me || data?.user || {};

    console.log("userData: ", userData)

    return (
        <div className="UserPage">
            {Auth.loggedIn() ? (
                <>
                    {loading ? <h1>userpage Loading!!</h1> : error ? <h1>there was an error!</h1> : (
                        <>
                            <h1>{loggedInUser.name}</h1>
                            <ul>
                                {loggedInUser.todos.length > 0 ? loggedInUser.todos.map(todo => <li key={todo._id}><strong>{todo.title}</strong> - {todo.content}</li>) : <h1>Nothing yet -- Create a TODO below!</h1>}
                            </ul>
                        </>
                    )}
                    <hr />

                    <NewTodoForm />
                </>) : (
                <h1>please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to view todos </h1>
            )}
        </div>
    )
}
