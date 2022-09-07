import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import TodoList from "./TodoList";

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) =>
            todo.id === id
                ? { ...todo, isDone: !todo.isDone }
                : todo
        ))
    }

    const handleDelete = (id: number) => {
        const confirmation = window.confirm('Are you sure you want to delete this homework?');
        if (confirmation) {
            const detetetElements = todos.filter(todo => {
                return todo.id !== id
            })
            setTodos(detetetElements);
        }

    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map(todo => (
            todo.id === id
                ? { ...todo, todo: editTodo }
                : todo
        )))
        setEdit(false);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);


    return (
        <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
            {
                edit
                    ? <input
                        ref={inputRef}
                        value={editTodo}
                        type="text"
                        className="todos__single--text"
                        onChange={(e) => {
                            setEditTodo(e.target.value);
                        }}
                    />
                    : todo.isDone
                        ? <s className="todos__single--text">{todo.todo}</s>
                        : <span className="todos__single--text">{todo.todo}</span>

            }



            <div>
                <span className="icon">
                    <AiFillEdit onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit);
                        }
                    }} />
                </span>
                <span className="icon">
                    <AiFillDelete onClick={() => handleDelete(todo.id)} />
                </span>
                <span className="icon">
                    <MdOutlineDone onClick={() => handleDone(todo.id)} />
                </span>
            </div>
        </form>
    );
}

export default SingleTodo;