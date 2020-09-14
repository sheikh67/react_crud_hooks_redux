import React, { useState, useEffect, Fragment } from 'react' 
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {getData, deleteTodo} from '../store/action/index'
import '../assets/style.css';
import { connect } from 'react-redux';
import loader from '../assets/loader.gif'

const mapStateToProps = state => {
    return{
      todoList : state.todos,
      isLoading : state.isLoading 
    }
  }

function ListTodo(props){

    const [data, setData] = useState([]);
    const [alertMsg, setAlert] = useState('');
    

    const GetData = async () => {
        const res = await axios.get('http://localhost:4000/api/v1/todos');
        setData(res.data);
        if(res.data.length === 0)
        {
            setAlert("No Record Found.")
        }

        props.getData()
    };

    useEffect(() =>{
        GetData();
        console.log(props.todoList)
        return () => console.log('Rendering from ListTodo')
    }, [JSON.stringify(props.todoList)]);

    const delTodo = (id) => {
        //props.deleteTodo(id)
        axios.delete("http://localhost:4000/api/v1/todos/" + id)
        .then(res => {
            if(res.data.deletedCount > 0)
            {
                const tempData = data.filter((item) => item._id !== id)
                setData(tempData)
                if(tempData.length === 0)
                {
                    setAlert("No Record Found.")
                }
            }
        })
    }

    const editTodo = (id) => {
        props.history.push({pathname: 'edit-todo/' + id})
    }
       
    return(
        <Fragment>
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Resposibility</th>
                        <th>Priority</th>
                        <th>Completed</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((todo, i) => {
                                return(
                                <tr key={i}>
                                    <td>{todo.todo_description}</td>
                                    <td>{todo.todo_responsible}</td>
                                    <td>{todo.todo_priority}</td>
                                    <td>{todo.todo_completed.toString()}</td>
                                    <td>
                                        <Button size="sm" onClick={() => {editTodo(todo._id)}} variant="primary">edit</Button>
                                        &nbsp;
                                        <Button size="sm" onClick={() => {delTodo(todo._id)}} variant="danger">Delete</Button>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
                {alertMsg !== '' &&
                    <div className="alert alert-warning">
                        {alertMsg}
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default connect(mapStateToProps, {getData, deleteTodo})(ListTodo)