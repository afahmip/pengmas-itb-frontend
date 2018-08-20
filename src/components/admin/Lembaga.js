/* global $ */

import React, { Component } from 'react';
import { Col, Row, PageHeader, Panel, Tabs, Tab } from 'react-bootstrap';
import LembagaForm from './LembagaForm';
import api_url from 'configs/config';

class Lembaga extends Component {
    state = {
        table: null
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Lembaga',
            success     : (result) => {
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
                        <th>Nama Lembaga</th>
                        <th>Kategori</th>
                        <th>Penanggung Jawab</th>
                        <th>No.HP Penanggung Jawab</th>
                        <th>Email</th>
                        <th>ID Line</th>
                        <th>Instagram</th>
                        <th>Website</th>
                        <th>Youtube</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createRow(data)}
                </tbody>
            </table>)
        })
    }

    deleteItem = (id) => {
        if(window.confirm("Apakah Anda yakin ingin menghapus lembaga ini?\n(Tidak bisa di-undo)")) {
            $.ajax({
                type        : 'DELETE',
                url         : api_url + '/api/Lembaga/' + id.toString(),
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
                            <a href={'/admin/lembaga/' + elem.id}>Edit</a>
                            &nbsp;|&nbsp;
                            <a onClick={() => this.deleteItem(elem.id)} style={deleteStyle}>Delete</a>
                        </div>
                    </td>
                    <td>{elem.category}</td>
                    <td>{elem.penanggung_jawab}</td>
                    <td>{elem.nomor_hp}</td>
                    <td>{elem.email}</td>
                    <td>{elem.id_line}</td>
                    <td>{elem.instagram}</td>
                    <td>{elem.web}</td>
                    <td>{elem.youtube}</td>
                </tr>
            )
        });

        return result;
    }

    // createTable = data => {
    //     let placeholder = document.getElementById('admin-database__table');
    //     let table = document.createElement('table');
    //     let headers = ['name', 'penanggung_jawab', 'email'];
    //     let headerName = {
    //         'name'              : 'Nama Himpunan',
    //         'penanggung_jawab'  : 'Penanggung Jawab',
    //         'email'             : 'Email'
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
    //     for(var i=0; i<data.length; i++) {
    //         tr = document.createElement('tr');
    //         let td = document.createElement('td');
    //         append(tr, td, data[i]['name']);
    //         td = document.createElement('td');
    //         append(tr, td, data[i]['penanggung_jawab']);
    //         td = document.createElement('td');
    //         append(tr, td, data[i]['email']);
    //         tbody.appendChild(tr);
    //     }
    //     table.appendChild(tbody);

    //     /* Append to placeholder */
    //     placeholder.appendChild(table);
    //     $('table').DataTable({
    //         // 'scrollX'   : true
    //     });
    // }

    render() {
        return (
            <Row>
                <Col lg={12}>
                    <PageHeader>
                        Database Lembaga
                    </PageHeader>
                </Col>
                <Col lg={12}>
                    <Tabs defaultActiveKey={1}>
                        <Tab eventKey={1} title='Daftar Lembaga'>
                            <Panel>
                                <Panel.Body>
                                    {this.state.table}
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