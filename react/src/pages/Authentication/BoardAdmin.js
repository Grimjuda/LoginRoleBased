import React, { useState, useEffect } from "react";

import UserService from "./services/user.service";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal,Button, TextField,Switch} from '@material-ui/core'
import {Edit,Delete} from '@material-ui/icons'
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'

const baseURL = "http://localhost:8080/api/test/"
const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
    top:'50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  Icons: {
cursor: 'pointer'
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
 
 
  fullWidth: {
    width: "100%"
  },

}));

const BoardAdmin = () => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const [modalEdit,setModalEdit] = useState(false);
  const [modalDelete,setModalDelete] = useState(false);
  const [userSelected,setUserSelected] = useState({

    id: null,
    username: '',
    email: '',
 
   
    
  })
const handleChange = e => {
  const {name,value} = e.target;
  setUserSelected(prevState =>({
    ...prevState,
    [name] : value
  }))
  console.log(userSelected);
}
const openCloseModalEdit = () => {
  setModalEdit(!modalEdit);
}
const openCloseModalDelete = () => {
  setModalDelete(!modalDelete);
}
const updateUser = async ()  => {
await axios.put(baseURL+"updateUser/"+userSelected.id,userSelected).then(response =>{
  var updatedData = content;
  updatedData.map( user =>{
    if(userSelected.id === user.id) {
      user.username = userSelected.username;
      user.email = userSelected.email;
      
    
    }
  })
  setContent(updatedData);
  openCloseModalEdit();
})
}
const deleteUser = async() => {
  await axios.delete(baseURL+'deleteUser/'+userSelected.id)
  .then(response => {
    setContent(content.filter(user => user.id !== userSelected.id))
    openCloseModalDelete();
  })
}

const selectUser = (user,action) => {
  setUserSelected(user);
  (action === 'Edit')? openCloseModalEdit() : openCloseModalDelete()
}
const bodyEdit = (
<div className={classes.modal}>
  <h3>Editar usuario</h3>
<TextField name="username" fullWidth label="Nombre de usuario" onChange={handleChange} value={userSelected && userSelected.username}></TextField>
<br/>
<TextField name="email" fullWidth label="email" onChange={handleChange} value={userSelected && userSelected.email}></TextField>

<br/>

<div align="right">
  <Button color="primary" onClick={ () => updateUser()}>Editar</Button>
  <Button onClick={ () => openCloseModalEdit()}>Cancelar</Button>

</div>
  
</div>) 

const bodyDelete = (
<div className={classes.modal}>
<p>Estás seguro de eliminar al usuario <b>{userSelected && userSelected.username}</b>?</p>
<p>Email: <b>{userSelected && userSelected.email}</b></p>

<div align="right">
  <Button color="secondary" onClick={ () => deleteUser()}>Eliminar</Button>
  <Button onClick={ () => openCloseModalDelete()}>Cancelar</Button>
</div>
</div>)

const UserList = () => {
  UserService.getAdminBoard().then(
    (response) => {
      setContent(response.data);
      console.log(response.data);
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setContent(_content);
    }
  );
}
useEffect(  () => {
  UserList()
      
  }, []);
  
  return (
    <div  >
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Username</TableCell>
             <TableCell>Email</TableCell>
           
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {content.map(usuario =>(

             <TableRow key = {usuario.id}>
             <TableCell>{usuario.username}</TableCell>
             <TableCell>{usuario.email}</TableCell>
            
             <TableCell>
             <Edit className={classes.Icons} onClick= { () => selectUser(usuario,'Edit')}/>
             &nbsp; &nbsp; &nbsp;
             <Delete className={classes.Icons} onClick= { () => selectUser(usuario,'Delete')}/>
             </TableCell>
             </TableRow>

           )

           )}
         </TableBody>
       </Table>
     </TableContainer>

     <Modal
     open={modalEdit}
     onClose={openCloseModalEdit}>

       {bodyEdit}

     </Modal>
     <Modal
     open={modalDelete}
     onClose={openCloseModalDelete}>

       {bodyDelete}

     </Modal>
    </div>
  );
};

export default BoardAdmin;