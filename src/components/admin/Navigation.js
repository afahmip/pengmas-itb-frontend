import React, { Component } from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import 'css/navigation-admin.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: this.props.path
        };
    }

    render() {
        return (
            <Navbar inverse fixedTop id='admin__navbar'>
                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand>
                        <a href="index.html">Admin Page</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <ul className="nav navbar-right top-nav">
                    <NavDropdown title='Profile'>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                        </li>
                        <li>
                            <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </NavDropdown>
                </ul>
                <Navbar.Collapse>
                    <ul className="nav navbar-nav side-nav">
                        <li>
                            <a href={this.props.path}><i className="fa fa-fw fa-home"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href={this.props.path + '/database'}><i className="fa fa-fw fa-chart-bar"></i> Data Kegiatan</a>
                        </li>
                        <li>
                            <a href={this.props.path + '/lembaga'}><i className="fa fa-fw fa-table"></i> Daftar Lembaga</a>
                        </li>
                        <li>
                            <a href={this.props.path + '/kategori'}><i className="fa fa-fw fa-edit"></i> Daftar Jenis Kegiatan</a>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;