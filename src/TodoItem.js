import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoItem(props) {
    
    const [ isFading, setIsFading ] = useState("");
    const [ isRemoving, setIsRemoving ] = useState("");
    const [ isCollapsing, setIsCollapsing] = useState("");
    const [ isCollapsingMargin, setIsCollapsingMargin] = useState("");
    
    let textField = React.createRef();

    function checkForChange() {
        if( textField.current.innerHTML === "") { //delete if empty
            props.delete(props.date);
        } else if( textField.current.innerHTML !== props.text ) { //update (or create) if text is changed
            props.update(textField.current.innerHTML)
        } else { //don't do anything otherwise
            console.log("not sending update!");
        }
    }

    function interrimDelete() {
        setIsFading(" fading");
        setTimeout( () => {
            setIsRemoving(" removing");
            setIsCollapsing(" collapsing");
            setIsCollapsingMargin(" collapsing-margin");
        }, 200);
        setTimeout( () => {
            props.delete(props.date)
        }, 400);
    }

    useEffect(() => {
        console.log("Re-render TodoItem:")
        console.log(props.text)
        if(props.text === ""){ //if item is new
            textField.current.focus();
        }
    })

    return (
        <div className={ "todo-item" + isCollapsingMargin }>
            <div className={ "todo-text" + isFading + isRemoving }
                 contentEditable={ true }
                 suppressContentEditableWarning={ true } //maybe turn this into an input field..
                 onKeyDown={ checkForEnter } 
                 onBlur={  checkForChange }
                 ref={ textField } 
                 data-placeholder="What needs to be done?" >
                   { props.text }
            </div>
            <div className={ "delete-btn" + isFading + isCollapsing } onClick={ interrimDelete }></div>
        </div>
    )
}

function checkForEnter(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        event.target.blur();
    }
}


export default TodoItem;