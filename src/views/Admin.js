import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import 'css/admin.css';
import Navigation from 'components/admin/Navigation';
import Dashboard from 'components/admin/Dashboard';
import Database from 'components/admin/Database';
import DatabaseSingle from 'components/admin/DatabaseSingle';
import Lembaga from 'components/admin/Lembaga';
import LembagaSingle from 'components/admin/LembagaSingle';
import Category from 'components/admin/Category';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.path = '/admin';
    }

    render() {
        return (
            <div>
                <Navigation path={this.path}/>
                <div id="admin-wrapper">
                    <Grid fluid>
                        <Switch>
                            <Route eaxct path={this.path + '/database/:id'} component={DatabaseSingle}/>
                            <Route exact path={this.path + '/database'} component={Database}/>
                            <Route exact path={this.path + '/lembaga/:id'} component={LembagaSingle}/>
                            <Route exact path={this.path + '/lembaga'} component={Lembaga}/>
                            <Route exact path={this.path + '/kategori'} component={Category}/>
                            <Route path={this.path} component={Dashboard}/>
                        </Switch>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Admin;