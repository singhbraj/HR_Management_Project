import React, { Component } from 'react'
import axios from 'axios';

import { Button,Table } from 'semantic-ui-react'
import RecordList from './recordList';

export default class view extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            page:1,
             employees:[]
        }  
    }
    preHandle=()=>{
        if(this.state.page >1){
       this.setState({page:this.state.page-1},()=>{
        axios.get('http://localhost/practice/public/index.php/api/employees/'+this.state.page)
        .then(response => {
            this.setState({employees:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
       });
    }
    }

    nextHandle=()=>{
        this.setState({page:this.state.page+1},()=>{
            axios.get('http://localhost/practice/public/index.php/api/employees/'+this.state.page)
            .then(response => {
                this.setState({employees:response.data});
            })
            .catch(function(error){
                console.log(error);
            })
           });
        //console.log(this.state.page);
    }

    componentDidMount(){

        axios.get('http://localhost/practice/public/index.php/api/employees/'+this.state.page)
        .then(response => {
            this.setState({employees:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
       
    }

    usersList(){
        return this.state.employees.map((object,i)=>{
            return <RecordList obj={object} key={i} />;
        });
    }

    

    render() {
        return (
            <div  className="view">
                <h3 align="center">Employee List</h3>
                <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Emp Name</Table.HeaderCell>
        <Table.HeaderCell>Emp Salary</Table.HeaderCell>
        <Table.HeaderCell>Emp Desi</Table.HeaderCell>
        <Table.HeaderCell colSpan="2">Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
                    <tbody>
                        {this.usersList()}
                    </tbody>

   </Table>
      <div>
        <Button onClick={this.preHandle} primary>Previous</Button>
        <Button onClick={this.nextHandle} primary>Next</Button>
      </div>
            </div>
        )
    }
} 