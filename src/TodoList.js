import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList(props) {

    const [ todoList, setTodoList ] = useState(
        getMockItems().map( todo => {
        return <TodoItem text={ todo.text } key={ todo.date } />;
    }));

    useEffect(() =>{
        console.log("something happened!")
        console.log(props)        
        if(props.addNewTodo) {
            addNewTodoToList();
            props.addedTodo();
        }
    })

    function addNewTodoToList() {
        setTodoList([
            <TodoItem text="" key={ Date.now() } />,
            ...todoList
          ])
    }

    return (
        <div className="todolist">
            { todoList }
        </div>
    )
}

function getListItems() {

}



function getMockItems() {
    let list = [];
    list.push( { 'text': "Read a booooook", 'date': 1 });
    list.push( { 'text': "Turn in assignment", 'date': 2 });
    list.push( { 'text': "Shop groceries", 'date': 3 });
    return list;
}

export default TodoList;