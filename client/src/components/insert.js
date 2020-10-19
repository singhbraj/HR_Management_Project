import React, { Component } from 'react'
import { Button, Form} from 'semantic-ui-react'
import axios from 'axios';


export default class insert extends Component {



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
    
    
            axios.post('http://localhost/practice/public/index.php/api/employees/add',obj)
            .then(res=>console.log(res.data));
            this.setState({
                e_name:'',
                e_salary:'',
                e_desi:''
                })
        }
    


    render() {
        return (
            <div className="insert">
                <div style={{marginTop:10}}>
                <h3>Add New Employee</h3>
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

               <Button  primary type='submit'>Add</Button>

                </Form>
            
            </div>

            </div>
        )
    }
}
