import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import {useState} from "react";
import TextField from '@material-ui/core/TextField'
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
username: Yup.string()
  .required('Username is required')
  .min(6, 'Username must be at least 6 characters')
  .max(20, 'Username must not exceed 20 characters'),
email: Yup.string()
  .required('Email is required')
  .email('Email is invalid'),
password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters')
  .max(40, 'Password must not exceed 40 characters'),
confirmPassword: Yup.string()
  .required('Confirm Password is required')
  .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),})
const Signup = ({history}) => {
  const [message,setMessage] = useState("")
 const formik = useFormik({
   initialValues: {
     username: '',
     email: '',
     password: '',
     confirmPassword: '',
   },
   onSubmit: (values) => {
     
    AuthService.register(values.username, values.email, values.password).then(
      (response) => {
        setMessage(response.data.message);
        setTimeout(() => {
          history.push("/signin");
        }, 5000);
        
        
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
 
    
 
 

  const classes = useStyles();
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
                    Create an app id to continue.
                  </Typography>
                  {message && <Typography variant="overline" >{message}</Typography>}
                </div>
                <TextField
                  
                  id="username"
                  name="username"
                  label="Usuario"
                  className={classes.textField}
                 fullWidth
                  margin="normal"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                 
                  id="email"
                  name="email"
                  label="Email address"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                 
                  id="password"
                  name="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                 fullWidth
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                 
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              
                <Button
                   variant="contained"
                   color="primary"
                   fullWidth
                   type="submit"
                >
                  Create your account
                </Button>
                <div className="pt-1 text-xs-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signin">
                    <Button>Access your account.</Button>
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

export default Signup;
