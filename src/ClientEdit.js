import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';

import AppNavbar from './AppNavbar';

class ClientEdit extends Component {

    emptyItem = {
        name: '',
        email: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const str = this.props.match.params.id;
            const id = (str.substring(str.indexOf(':') + 1)); 
            const client = await (await fetch(`/clients/getClientByid?${id}`)).json();
            this.setState({item: client});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
    
        await fetch('/clients' + (item.id ? '/updateClient?id=' + item.id : '/addClient'), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push(`/clients`);
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container>
                <div className="my-3 d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">{title}</h3>
                </div> 
                <Form onSubmit={this.handleSubmit}  className="border p-4">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup className="p-1">
                        <ButtonGroup>
                            <Button size="m" outline color="primary" type="submit">
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                    <span className="align-middle">Save</span>
                            </Button>{' '}
                            <Button size="m" outline color="secondary" tag={Link} to="/clients">
                                <FontAwesomeIcon icon={faCancel} />
                                    <span className="align-middle">Cancel</span>
                            </Button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(ClientEdit);  