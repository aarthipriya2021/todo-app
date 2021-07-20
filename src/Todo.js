import React, { useState} from 'react';
import { Modal,List, ListItem, ListItemText, ListItemAvatar, Button} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { db} from './firebase';
import './Todo.css';

//from material-ui modal
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
          height:'9ch',
        },
      },
    paper: {
      position: 'absolute',
      margin:'80px 50px 50px 35%',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    save: {
        margin:'0px 0px 0px 10px',
    },
    delete: {
        margin:'-20px 0px 0px 80%',
        
    },
    edit: {
        marginLeft:'15%'
    },
    list: {
        marginTop:'50px'
    }
  }));
  const theme = createTheme({
    typography: {
        "fontFamily": 'Playfair Display',
        "fontSize": 20,
        
    }
  });
  

function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState()

    // const handleOpen = () => {
    //     setOpen(true);
        
    // }

  const updateTodo = () => {
      // update todo with new input
      db.collection('todos').doc(props.todo.id).set({
        todo:input 
      }, { merge: true})

      setOpen(false); 
    //   console.log(input);
  }  
    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >   
                <div className={classes.paper}>
                    <h3>Please update here :</h3>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="outlined-basic"  variant="outlined" value={input} placeholder={props.todo.todo} onChange={e => setInput(e.target.value)} />
                    </form>
                   
                    {/* Updating data in todo list */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.save}
                        startIcon={<SaveIcon />}
                        onClick={updateTodo === "" ? "" : updateTodo}
                    >Save
                    </Button>
                    
                </div>
                
                </Modal>
                <List className={classes.list}>
                    <ListItem style={{ }}>
                    <ListItemAvatar>
                    </ListItemAvatar>
                        <ListItemText primary={props.todo.todo}  />
                        
                    </ListItem>
                    
                    {/* Edit */}
                    <Button className={classes.edit} variant="outlined" color="secondary" onClick={e => setOpen(true)}>
                        Edit
                    </Button>
                    
                    {/* deleting the todo */}
                    <DeleteForeverIcon className={classes.delete}  onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
                    
                </List>
        </ThemeProvider>
        
    )
    
}

export default Todo;
//props.todo.todo
//actually it seems like props.text text from app.js
//props.todo => object
// props.todo.text => props.todo.todo 