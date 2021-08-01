import React, { useState, useEffect} from 'react';
import { Button, FormControl,TextField } from '@material-ui/core';
import Todo from './Todo';
import { db } from './firebase';
import firebase from 'firebase';
import './App.css';


function App() {

  const [todos, setTodos] = useState(['Wake up, brush up','study well'])
  const [input, setInput] = useState('');
  
  const addTodo = (e) => {
    //will stop refresh 
    e.preventDefault();

    // adding the data into database
    db.collection('todos').add({
      todo: input,
      timestamp:  firebase.firestore.FieldValue.serverTimestamp(),
    })
    setTodos([...todos, input]);
    // clear up the input after submitting
    setInput('')
  }
//when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(()=> {
    // ths is code here.. fires when the app.js loads
    //orderBy() is acts like sorting desc. means recent items in top
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc=> doc.data()));
      //snapshot.docs.map(doc=> doc.data().todo) returns array of object
      setTodos(snapshot.docs.map(doc => ({ id:doc.id, todo: doc.data().todo})))
    })
  }, [])
  //console.log(input);
  return (
      <div className="App">
        <h1>TODO APP</h1>
        <form> 
          <FormControl >
            <TextField label="✍️Write a todo" value={input} onChange={(e)=>setInput(e.target.value)} />
          </FormControl>
            <Button style={{backgroundColor:'black', color:'white'}} variant="contained" color="primary" disabled={!input} type='submit' onClick={addTodo}>
              Add todo
            </Button> 
        </form>
        
        <ul>
          {todos.map((todo) => (
              <Todo todo={todo} />
          ))}
        </ul>
      </div>
    
  );
}

export default App;
