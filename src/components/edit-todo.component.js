import React, { useState, useEffect } from 'react'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import '../assets/style.css'

function EditTodo(props){

    const apiUrl = 'http://localhost:4000/api/v1/todos/' + props.match.params.id

    const [todos, setTodos] = useState({
        todo_description : '',
        todo_responsible : '',
        todo_priority : '',
        todo_completed : Boolean,
        todo_check : Boolean
      })

      const getData = async () => {
        const res = await axios.get(apiUrl)
        setTodos({
          todo_description : res.data.todo_description,
          todo_responsible : res.data.todo_responsible,
          todo_priority : res.data.todo_priority,
          todo_completed : res.data.todo_completed,
          todo_check : res.data.todo_completed
        })
    }

      useEffect(() => {
          getData();

          return () => console.log('Rendring from EditTodo')
      }, []);

      const updateTodo = async (e) => {
        e.preventDefault();
        const data = {
          todo_description : todos.todo_description,
          todo_responsible : todos.todo_responsible,
          todo_priority : todos.todo_priority,
          todo_completed : todos.todo_completed
        }

        await axios.post(apiUrl, data)
        .then(res => {
            console.log(res.data)
        })

        props.history.push('/todo-list')
    }

    const onChange = (e) => {  
        setTodos({...todos, [e.target.name] : e.target.value, todo_check : !todos.todo_completed })
    }


    return(
        <div className="form-wrapper">
        <Form onSubmit={updateTodo}>
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

          <Form.Group controlId="todo_complete">
            <Form.Label>Todo Completed</Form.Label>
            <Form.Control type="text" name="todo_complete" value={todos.todo_completed.toString()} disabled />
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

          <Button variant="success" size="lg" block="block" type="submit">
            Edit Todo
          </Button>
        </Form>
    </div>
    )
}

export default EditTodo