import React from 'react'
import { useQuery } from '@apollo/client';
import { queries } from '../../utils/queries';
import { useParams } from 'react-router';


export default function UserPage() {

    const params = useParams();
    console.log(params)
    const userId = params.id

    const { loading, error, data } = useQuery(queries.QUERY_GET_ONE_USER, {
        variables: { userId }
    });
    if (error) { console.log(error) }
    // console.log(data)


    return (
        <div>
            {loading ? <h1>userpage Loading!!</h1> : error ? <h1>there was an error!</h1> : (
                <>
                    <h1>{data.user.name}</h1>
                    <ul>
                        {data.user.todos.map(todo => <li key={todo._id}>todo: {todo.title}</li>)}
                    </ul>
                </>
            )}

        </div>
    )
}
