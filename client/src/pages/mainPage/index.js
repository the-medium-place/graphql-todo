import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../utils/queries';
import { Link } from 'react-router-dom'


export default function MainPage() {

    const { loading, error, data } = useQuery(GET_ALL_USERS);
    // const allUsers = data?.allUsers || [];
    if (error) { console.log(error) }

    return (
        <div className="MainPage">
            {loading ? <h1>loading...</h1> : error ? <h1>error!</h1> :
                (<div>
                    <h1>Welcome to GraphQL TODO'S!</h1>
                    <br />
                    <h4>please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to view todos </h4>


                    {/* {data.allUsers.map(user => (
                        <div key={user._id}>
                            <p><Link to={`/users/${user._id}`}>{user.name}</Link> - <em>{user._id}</em></p>
                            <ul>
                                {user.todos.map(todo => (
                                    <li key={todo._id}><strong>{todo.title}</strong> - {todo.content} <em>Due: {todo.dueDate / 1000}</em></li>
                                ))}
                            </ul>

                        </div>
                    ))} */}
                </div>)
            }
        </div>
    )
}
