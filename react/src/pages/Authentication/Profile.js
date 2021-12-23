import {React,useState,useEffect} from "react";
import AuthService from './services/auth.service'
import Button from "@material-ui/core/Button";

const Profile = ({history}) => {
 const currentUser = AuthService.getCurrentUser();
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const logOut = () => {
    AuthService.logout();

    history.push("/signin");
  };

  const goToAdminTable = () => {
    history.push("/admin")
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {


      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      { showAdminBoard && ( 
      
                 <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                 onClick={goToAdminTable}
                >
                  Tabla de usuarios
                </Button>)
                
                
                }

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  onClick={logOut}
                >
                  Logout
                </Button>
    </div>
  );
};

export default Profile;