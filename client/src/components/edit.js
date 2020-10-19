import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'


export default class edit extends Component {
    constructor(props) {
        super(props)
         
        this.onChangeEmpName = this.onChangeEmpName.bind(this);
        this.onChangeEmpSal = this.onChangeEmpSal.bind(this);
        this.onChangeEmpDes = this.onChangeEmpDes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            e_name:'',
            e_salary:'',
            e_desi:''
        }
    }

    componentDidMount(){

        axios.get('http://localhost/practice/public/index.php/api/employee/'+this.props.match.params.id)
        .then(response => {

    
            this.setState({
            
                e_name:response.data.e_name,
                e_salary:response.data.e_salary,
                e_desi:response.data.e_desi
            
            });
        })
        .catch(function(error){
            console.log(error);
        })
       
    }

        onChangeEmpName(e)
        {
            this.setState({
                e_name:e.target.value
            });
        }

        onChangeEmpSal(e)
        {
            this.setState({
                e_salary:e.target.value
            });
        }
       
        onChangeEmpDes(e)
        {
            this.setState({
                e_desi:e.target.value
            });
        }   

        onSubmit(e)
        {
            e.preventDefault();

            const obj={
                e_name:this.state.e_name,
                e_salary:this.state.e_salary,
                e_desi:this.state.e_desi
            };
    
    
            axios.put('http://localhost/practice/public/index.php/api/employee/update/'+this.props.match.params.id,obj)
            .then(res=>console.log(res.data));
            this.setState({
                isUpdate:true
            })
        }

 
    
    
    render() {

      
       
        return (

            <div style={{marginTop:10}}>
                <h3>Update User</h3>
                <Form onSubmit={this.onSubmit}>

                <Form.Field>
               <label>Emp Name</label>
               <input type="text" 
                value={this.state.e_name}
               onChange={this.onChangeEmpName}
               />
               </Form.Field>

               <Form.Field>
               <label>Emp Salary</label>
               <input type="text" 
                value={this.state.e_salary}
               onChange={this.onChangeEmpSal}
               />
               </Form.Field>



                 <Form.Field>
               <label>Emp Desi</label>
               <input type="text" 
                value={this.state.e_desi}
               onChange={this.onChangeEmpDes}
               />
               </Form.Field>

               <Button  primary type='submit'>Update</Button>

                </Form>
            </div>
        )
    }
}
