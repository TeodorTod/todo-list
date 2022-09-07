import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}



const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
   
    return (
        <>
            {todos.length < 1 && 
            <h1>There are no tasks available</h1>}
            {
                todos.length > 0 &&
                <div className="todos">
                    {todos.map(todo => (
                        <SingleTodo
                            todo={todo}
                            key={todo.id}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    ))}
                </div>
            }



        </>
    );
}

export default TodoList;