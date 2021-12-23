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
  const [userSelected,setUserSelected] = useState({

    _id: null,
    username: '',
    email: '',
    authorized: false,
    
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
const updateUser = async ()  => {
await axios.put(baseURL+"updateUser/"+userSelected._id,userSelected).then(response =>{
  var updatedData = content;
  updatedData.map( user =>{
    if(userSelected._id === user._id) {
      user.username = userSelected.username;
      user.email = userSelected.email;
      user.authorized = userSelected.authorized;
    }
  })
  setContent(updatedData);
  openCloseModalEdit();
})
}
const updateAutorizacion = async status => {
  var data = {
    _id: userSelected._id,
    username: userSelected.username,
    email: userSelected.email,
    authorized: status
  };

   await axios.put(baseURL+"updateUser/"+userSelected._id, data)
  .then(response => {
    setUserSelected({ ...userSelected, authorized: status });
    
    console.log(response.data);
    
  })
  .catch(e => {
    console.log(e);
  });
  UserList()
}

const selectUser = (user,action) => {
  setUserSelected(user);
  (action === 'Edit')&&setModalEdit(true)
}
const bodyEdit = (
<div className={classes.modal}>
  <h3>Editar usuario</h3>
<TextField name="username" fullWidth label="Nombre de usuario" onChange={handleChange} value={userSelected && userSelected.username}></TextField>
<br/>
<TextField name="email" fullWidth label="Nombre de usuario" onChange={handleChange} value={userSelected && userSelected.email}></TextField>
<br/>

{userSelected.authorized ? (
            <button
            
              onClick={() => updateAutorizacion(false)}
            >
              Denegar acceso
            </button>
          ) : (
            <button
             
              onClick={() => updateAutorizacion(true)}
            >
              Dar acceso
            </button>
          )}
<br/>
<TextField name="campoextra" fullWidth label="CampoExtra" onChange={handleChange} value={"Pendiente"}></TextField>
<br/>
<div align="right">
  <Button color="primary" onClick={ () => updateUser()}>Editar</Button>
  <Button onClick={ () => openCloseModalEdit()}>Cancelar</Button>

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
             <TableCell>Autorización</TableCell>
             <TableCell>Campo extra</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {content.map(usuario =>(

             <TableRow key = {usuario._id}>
             <TableCell>{usuario.username}</TableCell>
             <TableCell>{usuario.email}</TableCell>
             <TableCell>{usuario.authorized ? "Autorizado"  : "No autorizado" } </TableCell>
             <TableCell>{"Campo Extra"}</TableCell>
             <TableCell>
             <Edit className={classes.Icons} onClick= { () => selectUser(usuario,'Edit')}/>
             &nbsp; &nbsp; &nbsp;
             <Delete className={classes.Icons}/>
             </TableCell>
             </TableRow>

           )

           )}
         </TableBody>
       </Table>
     </TableContainer>

     <Modal
     open={modalEdit}
     onClose={ openCloseModalEdit}>

       {bodyEdit}

     </Modal>
    </div>
  );
};

export default BoardAdmin;