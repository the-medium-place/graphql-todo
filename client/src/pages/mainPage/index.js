import React from 'react'
import { useQuery } from '@apollo/client';
import { queries } from '../../utils/queries';
import { Link } from 'react-router-dom'


export default function MainPage() {


    const { loading, data } = useQuery(queries.QUERY_GET_ALL_USERS);
    // const allUsers = data?.allUsers || [];
    // console.log(data)

    return (
        <div>
            {loading ? <h1>loading...</h1> :
                (<div>
                    {data.allUsers.map(user => (
                        <div key={user._id}>
                            <p><Link to={`/users/${user._id}`}>{user.name}</Link> - <em>{user._id}</em></p>
                            <ul>
                                {user.todos.map(todo => (
                                    <li key={todo._id}><strong>{todo.title}</strong> - {todo.content} <em>Due: {todo.dueDate / 1000}</em></li>
                                ))}
                            </ul>

                        </div>
                    ))}
                </div>)
            }
        </div>
    )
}
