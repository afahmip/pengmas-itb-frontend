/* global $ */

import React, { Component } from 'react';
import { Col, Row, PageHeader, Panel, Tabs, Tab } from 'react-bootstrap';
import LembagaForm from './LembagaForm';
import api_url from 'configs/config';

class Lembaga extends Component {
    constructor(props) {
        super(props);

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Lembaga',
            success     : (result) => {
                this.createTable(result.data);
            },
            error       : function(result) {
                console.log(result);
            }
        });
    }

    createTable = data => {
        let placeholder = document.getElementById('admin-database__table');
        let table = document.createElement('table');
        let headers = ['name', 'penanggung_jawab', 'email'];
        let headerName = {
            'name'              : 'Nama Himpunan',
            'penanggung_jawab'  : 'Penanggung Jawab',
            'email'             : 'Email'
        }

        /* Helper function */
        let append = (parent, child, text) => {
            child.innerHTML = text;
            parent.appendChild(child);
        }
        let getHeaderName = key => { return headerName[key]; }

        /* Create table header */
        table.className = 'table table-striped table-bordered table-condensed table-hover';
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        headers.forEach(elem => {
            let th = document.createElement('th');
            append(tr, th, getHeaderName(elem));
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        /* Create table data */
        let tbody = document.createElement('tbody');
        for(var i=0; i<data.length; i++) {
            tr = document.createElement('tr');
            let td = document.createElement('td');
            append(tr, td, data[i]['name']);
            td = document.createElement('td');
            append(tr, td, data[i]['penanggung_jawab']);
            td = document.createElement('td');
            append(tr, td, data[i]['email']);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        /* Append to placeholder */
        placeholder.appendChild(table);
        $('table').DataTable({
            // 'scrollX'   : true
        });
    }

    render() {
        return (
            <Row>
                <Col lg={12}>
                    <PageHeader>
                        Database Lembaga
                    </PageHeader>
                </Col>
                <Col lg={12}>
                    <Tabs defaultActiveKey={2}>
                        <Tab eventKey={1} title='Daftar Lembaga'>
                            <Panel>
                                <Panel.Body>
                                    <div id='admin-database__table'/>
                                </Panel.Body>
                            </Panel>
                        </Tab>
                        <Tab eventKey={2} title='Tambah Lembaga'>
                            <Panel>
                                <Panel.Body>
                                    <LembagaForm/>
                                </Panel.Body>
                            </Panel>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}

export default Lembaga;