import React, { Component } from 'react'
import axios from 'axios';
import { Button, Form, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Navbar from './navbar';






export default class login extends Component {


       constructor(props) {
           super(props)
       
           this.state = {
                email:'',
                pass:'',
                emailError:'',
                passError:'',
                isLogin:false
           }
       }
        

       onChangeEmail =(e)=>{

         this.setState({
             email:e.target.value
         })

       }

       onChangePass=(e)=>{
           this.setState({
     pass:e.target.value
           })
       }


       validate =()=>{
          
        let emailError='';
        let passError='';
        if(!this.state.email.includes("@")){
            emailError="Invalid email";
        }
  
        if((this.state.pass).length<6)
        {
            passError="Password is not valid";
        }

        if(emailError || passError) 
        {
            this.setState({emailError,passError});
            return false;
        }
        return true;
       }

       onSubmit=(e)=>{
         
        e.preventDefault();

        const isValid = this.validate();

        if(isValid)
        {

        const obj={
            email:this.state.email,
            pass:this.state.pass
            
        };


        axios.post('http://localhost/practice/public/index.php/api/login',obj)
        .then(res=>{console.error('this is res',res.data)
        if(res.data.success === true){
         this.setState({
               email:'',
               pass:'',
               isLogin:true
            })
        }
        
     
    });
       }
    }

    render() {
     

        const {isLogin,isAuth} = this.state;

        if(isLogin)
        {
            return (
             <Navbar />
            )

        }
     
     
     
      

        return (
            <div style={{marginTop:100}} className="login">
            <h3>Login User</h3>
            <Form onSubmit={this.onSubmit}>
              
               <Form.Field>
               <label>Email</label>
               <input type="text" 
                value={this.state.email}
               onChange={this.onChangeEmail}
               />
                <div style={{fontSize:12,color:"red"}}>
                  {this.state.emailError}
              </div>
               </Form.Field>
             
               <Form.Field>
               <label>Password:</label>
               <input type="text" 
                value={this.state.pass}
               onChange={this.onChangePass}
               />
                 <div style={{fontSize:12,color:"red"}}>
                  {this.state.passError}
              </div>
               </Form.Field>
               
       
               <Button  primary type='submit' >Login</Button>
               <Link  to={"/signup"}   className="button"> Don't Have An Account
  
             </Link>

            
            </Form>
        
        </div>
        )
        }
    }

