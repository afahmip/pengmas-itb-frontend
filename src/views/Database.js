/* global $ */

import React, { Component } from 'react';
import api_url from 'configs/config';
import { Grid, Panel, Tab, Tabs } from 'react-bootstrap';

class Database extends Component {
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
            url         : api_url + '/api/Activity',
            success     : (result) => {
                console.log(result.data);
                this.divideData(result.data);
            },
            error       : function(result) {
                console.log(result);
            }
        });
    }

    divideData = data => {
        let comdev = [],
            comser = [];
        data.forEach(elem => {
            if(elem.category_id === 1) comdev.push(elem);
            else if(elem.category_id === 2) comser.push(elem);
        });
        console.log(data);
        this.createTable(comdev, 'db-comdev-table');
        this.createTable(comser, 'db-comser-table');
    }

    createTable = (data, id) => {
        if(data.length > 0) {
            let placeholder = document.getElementById(id);
            let table = document.createElement('table');
            let headers = ['lembaga_id', 'name'];
            let headerName = {
                'lembaga_id'    : 'Nama Lembaga',
                'name'          : 'Nama Kegiatan'
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
            for(let i=0; i<headers.length; i++) {
                let th = document.createElement('th');
                append(tr, th, getHeaderName(headers[i]));
            }
            thead.appendChild(tr);
            table.appendChild(thead);

            /* Create table data */
            let tbody = document.createElement('tbody');
            for(let i=0; i<data.length; i++) {
                tr = document.createElement('tr');
                let td = document.createElement('td');
                append(tr, td, data[i]['lembaga_name']);
                td = document.createElement('td');
                append(tr, td, data[i]['name']);
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

            /* Append to placeholder */
            placeholder.appendChild(table);
            $('table').DataTable({
                // 'scrollX'   : true
            });
        }
    }

    render() {
        let tableDivStyle = {
            margin  : '40px 0 50px 0'
        }

        return (
            <Grid>
                <h2 className='main-title'>Community Development & Community Service</h2>
                <div>
                    <p>Menurut Hayden (1979 : 175) <i>community development</i> adalah suatu proses yang merupakan usaha masyarakat sendiri yang diintegrasikan dengan otoritas pemerintah guna memperbaiki kondisi sosial ekonomi dan kultural komunitas, mengintegrasikan komunitas ke dalam kehidupan nasional dan mendorong kontribusi komunitas yang lebih optimal bagi kemajuan nasional. Sedangkan <i>community service</i> adalah kegiatan sosial yang dicirikan dengan jangka waktu yang singkat dan tidak berkelanjutan.</p>
                    <p>Berikut ini merupakan kegiatan pengabdian masyarakat ITB yang bersifat <i>community development</i> dan <i>community service</i>.</p>
                </div>
                <br/>
                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title='Community Development'>
                        <Panel>
                            <Panel.Body>
                                <div id='db-comdev-table' style={tableDivStyle}></div>
                            </Panel.Body>
                        </Panel>
                    </Tab>
                    <Tab eventKey={2} title='Community Service'>
                        <Panel>
                            <Panel.Body>
                                <div id='db-comser-table' style={tableDivStyle}></div>
                            </Panel.Body>
                        </Panel>
                    </Tab>
                </Tabs>
            </Grid>
        );
    }
}

export default Database;