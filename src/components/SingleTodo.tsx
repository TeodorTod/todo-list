import React, { useState } from "react";
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
        const detetetElements = todos.filter(todo => {
            return todo.id !== id 
        })
        setTodos(detetetElements);
    }

    return (
        <form className="todos__single">
            {
                todo.isDone
                    ? <s className="todos__single--text">{todo.todo}</s>
                    : <span className="todos__single--text">{todo.todo}</span>
            }

            <div>
                <span className="icon">
                    <AiFillEdit />
                </span>
                <span className="icon">
                    <AiFillDelete onClick={() => handleDelete(todo.id)}/>
                </span>
                <span className="icon">
                    <MdOutlineDone onClick={() => handleDone(todo.id)} />
                </span>
            </div>
        </form>
    );
}

export default SingleTodo;