import React, { Component } from 'react'
import axios from 'axios';
import {Redirect,Link} from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'

export default class recordList extends Component {

    constructor(props) {
        super(props)
        
        this.state={
            redirect:false

        }
        
          this.delete = this.delete.bind(this);
    }

    delete(){
        
        axios.delete('http://localhost/practice/public/index.php/api/employee/delete/'+this.props.obj.id)
        .then(
            this.setState({
                redirect:true
            })
        )
        .catch(err=>console.log(err))

    }
    render() {

        const {redirect} = this.state;

        if(redirect)
        {
            return <Redirect to='/view' />
        }
        return (
            
        <Table.Row>
                <Table.Cell>
                    {this.props.obj.e_name}
                </Table.Cell>
                <Table.Cell>
                    {this.props.obj.e_salary}
                </Table.Cell>
                <Table.Cell>
                    {this.props.obj.e_desi}
                </Table.Cell>
                <Table.Cell>
                   
                   <Link  to={"/edit/"+this.props.obj.id}  className="button"  > Edit

                   </Link>
                
                </Table.Cell>
                <Table.Cell>
                    <Button secondary onClick={this.delete} className="delete" >Delete</Button>
                </Table.Cell>
            </Table.Row>
            
        )
    }
}
