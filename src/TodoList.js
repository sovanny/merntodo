import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList(props) {

    const [ todoList, setTodoList ] = useState( [] );

    useEffect(() =>{
        const fetchList = async () => {
            try {
                const response = await axios.get("http://localhost:4000/todos");
                setTodoList(response.data);
            }
            catch (err) {
                console.log("Something went wrong: ");
                console.dir(err); //TODO: Reject instead
            }
        };
        fetchList();
    }, [])

    useEffect(() =>{
        addNewTodoToList(); //TODO: varför läggs den inte till första renderingen?
    }, [ props.addNewTodo ])

    function addNewTodoToList() {
        setTodoList([
            { 'text': "", 'date': Date.now() },
            ...todoList
          ])
        console.log("after adding one", todoList)
    }

    function handleTodoItemChange(text) {
        console.log("updateing!")
        let todo = {};
        let isNew = false;
        setTodoList( todoList.map( (item) => { 
            if( item.date === this.date ){
                isNew = (item.text === "");
                item.text = text;
                todo = item;
            }  
            return item;
        } ))

        if ( isNew ) {
            createTodo(todo).then(console.log);
        } else {
            updateTodo(todo).then(console.log);
        }
    }

    function deleteItemFromList() {
        console.log("deleting!" + this.date);
        setTodoList(todoList.filter( (item) => { 
            if(item.date === this.date){
                if(item._id != null){
                    console.log("true")
                    deleteTodo(item).then(console.log);
                }
                return false;
            }
            return true;
        }))
    }

    const renderList = todoList.map( item => {
        return <TodoItem text={ item.text } 
                            key={ item.date } 
                            date = { item.date }
                            upsert={ handleTodoItemChange }
                            delete={ deleteItemFromList }/> })

    return (
        <div className="todolist">
            { renderList }
        </div>
    )
}

const updateTodo = async todoItem => {
    try {
        await axios.put("http://localhost:4000/todos/" + todoItem._id, { text: todoItem.text });
    } catch (err) {
        console.log("Could not update item: ");
        console.dir(err);
        throw new Error(err.status) //TODO: handle rejections
    }
}

const createTodo = async todoItem => {
    try {
        const newItem = {
            text: todoItem.text,
            date: todoItem.date
        }
        const res = await axios.post("http://localhost:4000/todos/new", newItem);
        return res;
    } catch (err) {
        console.log("Could not create item: ");
        console.dir(err);
        throw new Error(err.status); //TODO: handle rejections
    }
}

const deleteTodo = async todoItem => {
    try {
        const res = await axios.delete("http://localhost:4000/todos/" + todoItem._id);
        return res;
    } catch (err) {
        console.log("Could not create item: ");
        console.dir(err);
        throw new Error(err.status); //TODO: handle rejections
    }
}

export default TodoList;