import React,{useState} from "react";
import {Form,Button,Alert} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutations";

import Auth from "../../context/auth";

const LoginForm = (props) =>{
    const [formState,setFormState] = useState({email:"",password:""});
    const [login,{error}] = useMutation(LOGIN_USER);

    const handleChange=(event)=>{
        const {name,value} = event.target;

        setFormState({
            ...formState,
            [name]:value,
        });
    };

    const handleFormSubmit = async(event)=>{
        event.prevenDefault();

        try{
            const {data} = await login({
                variables:{...formState},
            });

            Auth.login(data.login.token);
        }
        catch(e){
            console.error(e)
        }

        setFormState({
            email:"",
            password:""
        });
    };

    return(
        <main className="flex-row justify-center mb-4">
        <div className="col-12 col-md-6">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              <Form onSubmit={handleFormSubmit}>
                <Form.Control
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Form.Control
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button variant="success" className="btn d-block w-100" type="submit">
                  Submit
                </Button>
              </Form>
  
              {error && <div>Login failed</div>}
            </div>
          </div>
        </div>
      </main>
    );
};

export default LoginForm;