import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('clients/getAllClients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }
    async remove(id) {
        await fetch(`clients/deleteClient?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }
    
    render() {
        const {clients, isLoading} = this.state;
    
        if (isLoading) {
            return <p>Loading...</p>;
        }
    
        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td className="text-center" style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                <td className="text-center">{client.email}</td>
                <td className="text-center">
                    <ButtonGroup>
                        <Button size="m" outline color="primary" tag={Link} to={`/clients/:id=${client.id}`}>
                            <FontAwesomeIcon icon={faEdit} className="mr-1" />
                                Edit
                        </Button>
                        <Button size="m" outline color="danger" onClick={() => this.remove(client.id)}>
                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                Delete
                        
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
    
        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="my-3 d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Clients</h3>
                        <div>
                            <Button outline color="success" tag={Link} to="/clients/new">Add Client</Button>
                        </div>
                    </div> 
                    <Table  className="border p-4" bordered dark>
                        <thead>
                        <tr>
                            <th width="30%" className="text-center">Name</th>
                            <th width="30%" className="text-center">Email</th>
                            <th width="30%" className="text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default ClientList;