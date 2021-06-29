import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_TODO } from '../../utils/mutations';

export default function NewTodoForm() {

    const [todoFormState, setTodoFormState] = useState({
        title: '',
        content: '',
        dueDate: null
    })

    const [createTodo, { error, data }] = useMutation(CREATE_TODO);

    function handleInput(e) {
        const { name, value } = e.target;
        setTodoFormState({ ...todoFormState, [name]: value })
    }

    async function formSubmit(e) {
        e.preventDefault();
        // console.log(loginState);
        if (todoFormState.title.length > 0 && todoFormState.content.length > 0) {

            console.log(todoFormState);
            try {
                const { data } = await createTodo({
                    variables: { ...todoFormState },
                });
                console.log(data)
            } catch (err) {
                console.error(err);
            }

            // clear form values
            setTodoFormState({
                title: '',
                content: '',
                dueDate: null
            });

        } else {
            alert('todo must have title and content')
        }
    }


    return (
        <div className="NewTodoForm">
            <form onSubmit={formSubmit}>
                <input onChange={handleInput} name="title" value={todoFormState.title} />
                <textarea onChange={handleInput} name="content" value={todoFormState.content} />
                <input onChange={handleInput} type="date" name="dueDate" value={todoFormState.date} />
                <button type="submit">Submit</button>
            </form>
            <h2>{data ? 'data retrieved!' : error ? 'there was an error...' : ''}</h2>
        </div>
    )
}
