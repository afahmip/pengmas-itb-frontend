/* global $ */

import React, { Component } from 'react';
import { Col, Row, PageHeader, Panel, Tabs, Tab } from 'react-bootstrap';
import DatabaseForm from './DatabaseForm';
import api_url from 'configs/config';

class Database extends Component {
    state = {
        table: null
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
                // this.setState({data: result.data});
                this.showTable(result.data);
            },
            error       : function(result) {
                console.log(result);
            }
        });
    }
    
    showTable = data => {
        this.setState({
            table:
            (<table id='admin-database__table' className='table table-striped table-condensed table-hover'>
                <thead>
                    <tr>
                        <th>Nama Kegiatan</th>
                        <th>Nama Lembaga</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createRow(data)}
                </tbody>
            </table>)
        })
    }

    deleteItem = (id) => {
        if(window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?\n(Tidak bisa di-undo)")) {
            $.ajax({
                type        : 'DELETE',
                url         : api_url + '/api/Activity/' + id.toString(),
                success     : (result) => {
                    console.log(result);
                    window.location.reload();
                },
                error       : function(result) {
                    console.log(result);
                }
            });
        }
    }

    createRow = data => {
        let result = [];
        let deleteStyle = {
            color: 'red',
            cursor: 'pointer'
        }
        data.forEach(elem => {
            result.push(
                <tr key={elem.id}>
                    <td>
                        {elem.name}
                        <div>
                            <a href={'/admin/database/' + elem.id}>Edit</a>
                            &nbsp;|&nbsp;
                            <a onClick={() => this.deleteItem(elem.id)} style={deleteStyle}>Delete</a>
                        </div>
                    </td>
                    <td>{elem.lembaga_name}</td>
                </tr>
            )
        });

        return result;
    }

    // createTable = data => {
    //     let placeholder = document.getElementById('admin-database__table');
    //     let table = document.createElement('table');
    //     let headers = ['name', 'lembaga_name'];
    //     let headerName = {
    //         'lembaga_name'  : 'Nama Lembaga',
    //         'name'          : 'Nama Kegiatan',
    //     }

    //     /* Helper function */
    //     let append = (parent, child, text) => {
    //         child.innerHTML = text;
    //         parent.appendChild(child);
    //     }
    //     let getHeaderName = key => { return headerName[key]; }

    //     /* Create table header */
    //     table.className = 'table table-striped table-bordered table-condensed table-hover';
    //     let thead = document.createElement('thead');
    //     let tr = document.createElement('tr');
    //     headers.forEach(elem => {
    //         let th = document.createElement('th');
    //         append(tr, th, getHeaderName(elem)); 
    //     });
    //     thead.appendChild(tr);
    //     table.appendChild(thead);

    //     /* Create table data */
    //     let tbody = document.createElement('tbody');
    //     data.forEach(elem => {
    //         tr = document.createElement('tr');
    //         td = document.createElement('td');
    //         tr.appendChild(this.renderDetailUrl(elem));
    //         let td = document.createElement('td');
    //         append(tr, td, elem['lembaga_name']);
    //         tbody.appendChild(tr);
    //     });
    //     table.appendChild(tbody);

    //     /* Append to placeholder */
    //     placeholder.appendChild(table);
    //     $('table').DataTable({
    //         // 'scrollX'   : true
    //     });
    // }

    // renderDetailUrl = title => {
    //     let td = document.createElement('td');
    //     let div = document.createElement('div');
    //     let a = document.createElement('a');
        

    //     a.href = '/admin/database/' + (title.id).toString();
    //     a.innerHTML = title.name;
    //     td.appendChild(a);
    //     return td;
    // }

    render() {
        $('table').DataTable();

        return (
            <Row>
                <Col lg={12}>
                    <PageHeader>
                        Database Kegiatan
                    </PageHeader>
                </Col>
                <Col lg={12}>
                    <Tabs defaultActiveKey={1}>
                        <Tab eventKey={1} title='Daftar Kegiatan'>
                            <Panel>
                                <Panel.Body>
                                    {this.state.table}
                                </Panel.Body>
                            </Panel>
                        </Tab>
                        <Tab eventKey={2} title='Tambah Kegiatan'>
                            <Panel>
                                <Panel.Body>
                                    <DatabaseForm/>
                                </Panel.Body>
                            </Panel>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        );
    }
}
export default Database;