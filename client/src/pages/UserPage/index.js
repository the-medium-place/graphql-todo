import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ONE_USER, GET_ME } from '../../utils/queries';
import { DELETE_TODO } from '../../utils/mutations';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/client';
import NewTodoForm from '../../components/NewTodoForm';
import Auth from '../../utils/auth';


export default function UserPage() {

    const params = useParams();
    // console.log(params)
    const userId = params.id

    const [deleteTodo, { deleteError, deleteData }] = useMutation(DELETE_TODO);


    const { loading, error, data } = useQuery(
        userId ? GET_ONE_USER : GET_ME,
        {
            variables: { userId },
        }
    );

    async function handleDeleteClick(e) {
        const todoId = e.target.id
        console.log(e.target.id)
        try {
            const { data } = await deleteTodo({
                variables: { todoId },
            });
            console.log(data)
        } catch (err) {
            console.log(err)
        }

    }

    // const { loading, error, data } = useQuery(GET_ONE_USER, {
    //     variables: { userId }
    // });
    if (error) { console.log(error) }

    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const loggedInUser = data?.me || data?.user || {};

    return (
        <div className="UserPage">
            {Auth.loggedIn() ? (
                <>
                    {loading ? <h1>userpage Loading!!</h1> : error ? <h1>there was an error!</h1> : (
                        <>
                            <h1>{loggedInUser.name}<small style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }} onClick={Auth.logout}>&nbsp;Logout</small></h1>
                            <ul>
                                {loggedInUser.todos.length > 0 ? loggedInUser.todos.map(todo => <li key={todo._id}><strong>{todo.title}</strong> - {todo.content} -- <span style={{ color: 'red', fontSize: '1.4rem', cursor: 'pointer' }} id={todo._id} onClick={handleDeleteClick}>&times;</span></li>) : <h1>Nothing yet -- Create a TODO below!</h1>}
                            </ul>
                        </>
                    )}
                    <h4>{deleteError ? 'There was an error deleting your Todo, please reload and try again...' : deleteData ? 'Todo Successfully Deleted! Are you really done?' : null}</h4>
                    <hr />

                    <NewTodoForm />

                </>) : (
                <h1>please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to view todos </h1>
            )}
        </div>
    )
}
