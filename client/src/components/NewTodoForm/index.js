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
        <div className="NewTodoForm" style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
            <h2>{data ? 'data retrieved!' : error ? 'Could not retrieve todo items, please log in again' : ''}</h2>
            <form onSubmit={formSubmit} style={{ display: 'flex', flexDirection: 'column', width: '35%', background: 'lightGrey', borderRadius: '5px', padding: '.5em' }}>
                <h4>Create a New Todo!</h4>
                <p style={{ color: 'red', marginTop: '-1em' }}>*<span style={{ fontSize: ".6em" }}> - Required</span></p>
                <label htmlFor="title">Title<span style={{ color: 'red' }}>*</span></label>
                <input onChange={handleInput} id="titile" name="title" value={todoFormState.title} required />

                <label htmlFor="content">Content<span style={{ color: 'red' }}>*</span></label>
                <textarea onChange={handleInput} rows="6" id="content" name="content" value={todoFormState.content} required />

                <label htmlFor="dueDate">Due Date</label>
                <input onChange={handleInput} id="dueDate" type="date" name="dueDate" value={todoFormState.date} />

                <button type="submit" style={{ width: "33%", margin: '5px auto' }}>Submit</button>
            </form>

        </div>
    )
}
