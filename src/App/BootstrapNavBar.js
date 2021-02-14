
import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import isLogin from '../utils/isLogin';
import logout from '../utils/logout';

class BootstrapNavBar extends React.Component {
	render() {
		return (
			<div>
				<Navbar bg="light" expand="lg" style={{ width: '100%' }}>
					<Navbar.Brand href="/">Stock-Manager</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="/stocks">Stocks</Nav.Link>
							<Nav.Link href="/settings">Settings</Nav.Link>
							{/*
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
						*/}
						</Nav>

						{isLogin()
							? <Form inline><Button variant="outline-danger" onClick={logout}>Logout</Button></Form>
							: (
								<Form inline>
									<Button variant="outline-success mr-2" onClick={() => window.location.href = '/login'}>Login</Button>
									<Button variant="outline-warning" onClick={() => window.location.href = '/register'}>Register</Button>)
								</Form>
							)
						}


					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

export default BootstrapNavBar;