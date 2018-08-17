/* global $ */

import React, { Component } from 'react';
import api_url from 'configs/config';
import { Grid, Table } from 'react-bootstrap';

class ActivityDetail extends Component {

    componentDidMount() {
        const param = this.props.match.params;
        this.getData(param.id);
    }

    getData = (id) => {
        $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Activity/' + id.toString(),
            success     : (result) => {
                this.fillTable(result);
            },
            error       : function(result) {
                console.log(result);
            }
        });
    }

    fillTable = (data) => {
        document.querySelector('#act-name').innerHTML = data.name;
        document.querySelector('#act-lembaga').innerHTML = data.lembaga_name;
        document.querySelector('#act-category').innerHTML = data.category_name;
        document.querySelector('#act-desc').innerHTML = data.description;
        document.querySelector('#act-goal').innerHTML = data.goal;
        document.querySelector('#act-target').innerHTML = data.target;
        document.querySelector('#act-time').innerHTML = data.time;
    }

    render() {
        return (
            <Grid>
                <h2 className='main-title'>Detail Kegiatan</h2>
                <Table striped bordered condensed hover>
                    <tbody>
                        <tr>
                            <th>Nama Kegiatan</th>
                            <td id='act-name'/>
                        </tr>
                        <tr>
                            <th>Lembaga</th>
                            <td id='act-lembaga'/>
                        </tr>
                        <tr>
                            <th>Kategori</th>
                            <td id='act-category'/>
                        </tr>
                        <tr>
                            <th>Deskripsi</th>
                            <td id='act-desc'/>
                        </tr>
                        <tr>
                            <th>Tujuan Kegiatan</th>
                            <td id='act-goal'/>
                        </tr>
                        <tr>
                            <th>Sasaran Kegiatan</th>
                            <td id='act-target'/>
                        </tr>
                        <tr>
                            <th>Waktu Pelaksanaan</th>
                            <td id='act-time'/>
                        </tr>
                    </tbody>
                </Table>
                <br/>
            </Grid>
        );
    }
}

export default ActivityDetail;