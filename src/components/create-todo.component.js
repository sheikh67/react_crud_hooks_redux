import React, { useState } from 'react'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import {addTodo} from '../store/action/index'
import '../assets/style.css'
import { connect } from 'react-redux';

const globaTodo = {
  todo_description : '',
  todo_responsible : '',
  todo_priority : '',
  todo_completed : Boolean,
  todo_msg : ''
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodo : data => dispatch(addTodo(data)) 
//   }
// }

const mapStateToProps = state => {
  return{
    todoList : state.todos 
  }
}

function CreateTodo(props){
    //console.log(props)
    const apiUrl = 'http://localhost:4000/api/v1/todos'

    const [todos, setTodos] = useState(globaTodo)

      const insertTodo = (e) => {
          e.preventDefault();
          const data = {
            todo_description : todos.todo_description,
            todo_responsible : todos.todo_responsible,
            todo_priority : todos.todo_priority,
            todo_completed : todos.todo_completed
          }

          axios.post(apiUrl, data)
          .then(res => {
              setTodos({
                ...globaTodo,
                todo_msg : res.data})
                props.addTodo(data)
                props.history.push('/todo-list')
          })
      }

      const onChange = (e) => {
        //e.persist();  
        setTodos({...todos, [e.target.name] : e.target.value })
      }

    return(
        <div className="form-wrapper">
        {todos.todo_msg !== '' &&
          <div className="alert alert-success" >
            <strong>Success!</strong> {todos.todo_msg}
          </div>
        }
        
        <Form onSubmit={insertTodo}>
          <Form.Group controlId="todo_description">
            <Form.Label>Todo Description</Form.Label>
            <Form.Control type="text" name="todo_description" value={todos.todo_description} onChange={onChange} />
          </Form.Group>

          <Form.Group controlId="todo_responsible">
            <Form.Label>Todo Responsible</Form.Label>
            <Form.Control type="text" name="todo_responsible" value={todos.todo_responsible} onChange={onChange} />
          </Form.Group>

          <Form.Group controlId="todo_priority">
            <Form.Label>Todo Priority</Form.Label>
            <Form.Control type="text" name="todo_priority" value={todos.todo_priority} onChange={onChange} />
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} onChange={onChange}>
              <Form.Label as="legend" column sm={2}>
                Todo Completed
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Ture"
                  name="todo_completed"
                  value={true}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name="todo_completed"
                  value={false}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create Todo
          </Button>
        </Form>
    </div>
    )
}

export default connect(null, {addTodo})(CreateTodo)