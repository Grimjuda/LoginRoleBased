import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));

const ResetPassword = ({match}) => {
 const [password,setPassword] = useState("");
 const [confirmPassword,setConfirmPassword] = useState("")
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const resetPasswordHandler = async (e) => {
   e.preventDefault();
const config = {
  headers: {
   "Content-Type": "application/json",
  },
}
if (password !== confirmPassword) {
    setPassword("");
    setConfirmPassword("");
  setTimeout(() => {
    setError("");
  }, 5000);
  return setError("Las contraseñas no coinciden")
  }
try {
  const {data} = await axios.put(
    `/api/auth/resetpassword/${match.params.resetToken} `,
{password},
config
  );
  setSuccess(data.data);
} catch (error) {
  setError(error.response.data.error);
  setTimeout(() => {
    setError("");
  },5000);
}
 };
  const classes = useStyles();
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={resetPasswordHandler}>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                    alt=""
                  />
                  <Typography variant="caption">
                   Ingresa una nueva contraseña
                  </Typography>
                  {error && <Typography variant="overline">{error}</Typography>}
                  {success && <Typography variant="button">{success}</Typography>}
                </div>
                <TextField
                  id="password"
                  label=" Enter new password:"
                  className={classes.textField}
                  fullWidth
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <TextField
                  id="confirmpassword"
                  label="Confirm new password:"
                  className={classes.textField}
                  fullWidth
                  type="password"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="mt-1"
                  type="submit"
                >
                  Send password reset
                </Button>
                <div className="pt-1 text-xs-center">
                  <Link to="/signin">
                    <Button>Sign</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signup">
                    <Button>Create new account.</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
