import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {useFormik} from 'formik'
import * as Yup from 'yup';
import AuthService from './services/auth.service'


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
const validationSchema = Yup.object().shape({
 
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  })
const PasswordReset = () => {
  const classes = useStyles();
  const [message,setMessage] = useState("")
  const formik = useFormik({
    initialValues: {
  
      email: '',
     
    },
    onSubmit: (values) => {
      
     AuthService.forgotpassword( values.email).then(
       (response) => {
     
         setMessage(response.data.data);
       
         setTimeout(() => {
          setMessage("");
        },5000);
         
       },
       (error) => {
         const resMessage =
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString();
 
         setMessage(resMessage);
        
       }
     );
     
    
    },
    validationSchema: validationSchema
  })
  
     
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                    alt=""
                  />
                  <Typography variant="caption">
                    Enter your email and we'll send you instructions on how to
                    reset your password.
                  </Typography>
                  {message && <Typography variant="overline" >{message}</Typography>}
                </div>
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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

export default PasswordReset;
