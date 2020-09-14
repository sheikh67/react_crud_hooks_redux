import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

import CreateTodo from './components/create-todo.component';
import EditTodo from './components/edit-todo.component';
import ListTodo from './components/todo-list.component';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



export default () => {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to='/create-todo' className='nav-link'>
                React MERN Stack App with Hooks and Redux
              </Link>
            </Navbar.Brand>

            <Nav className='justify-content-end'>
              
              <Nav>
                <Link to='/create-todo' className="nav-link">
                  Create Todo
                </Link>
              </Nav>

              <Nav>
                <Link to='/todo-list' className='nav-link'>
                  Todo List
                </Link>
              </Nav>
              
            </Nav>
          </Container>
        </Navbar>
      </header>
      
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
            <Switch>
              <Route exact path="/" component={CreateTodo} />
              <Route path="/create-todo" component={CreateTodo} />
              <Route path="/edit-todo/:id" component={EditTodo} />
              <Route path="/todo-list" component={ListTodo} />
            </Switch>
            </div>
          </Col>
        </Row>
      </Container>

    </div>
    </Router>
  );
}

