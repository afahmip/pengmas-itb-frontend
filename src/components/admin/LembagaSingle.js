/* global $ */
/* global google */

import React, { Component } from 'react';
import { Row, Col, PageHeader, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import api_url from 'configs/config';

class LembagaSingle extends Component {
    state = {
        id      : null,
        name    : '',
        lembaga : '',
    }

    componentDidMount() {
        const param = this.props.match.params;
        this.setState({id: param.id});
        this.getData(param.id);
        // this.initCategoryOption();
    }

    getData = (id) => {
        $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Lembaga/' + id.toString(),
            success     : (result) => {
                this.setState({name: result.name});
                this.fillTable(result);
            },
            error       : function(result) {
                console.log(result);
            }
        });
    }

    initCategoryOption = () => {
       $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Category',
            success     : function(result) {
                let placeholder = document.querySelector('#lbg-category')
                result.data.forEach(e => {
                    let option = document.createElement('option')
                    option.value = e.id
                    option.innerHTML = e.name
                    placeholder.appendChild(option)
                })
            },
            error       : function(result) {
                console.log(result)
            }
        })
    }

    fillTable = (data) => {
        document.querySelector('#lbg-name').value = data.name;
        // document.querySelector('#act-lembaga').innerHTML = data.lembaga_name;
        // document.querySelector('#act-category').value = data.category_name || '';
        document.querySelector('#lbg-nomor_hp').value = data.nomor_hp || '';
        document.querySelector('#lbg-penanggung_jawab').value = data.penanggung_jawab || '';
        document.querySelector('#lbg-email').value = data.email || '';
        document.querySelector('#lbg-id_line').value = data.id_line || '';
        document.querySelector('#lbg-instagram').value = data.instagram || '';
        document.querySelector('#lbg-web').value = data.web || '';
        document.querySelector('#lbg-youtube').value = data.youtube || '';
    }

    editLembaga = () => {
        let data = {
            'id'                : this.state.id,
            'name'              : document.querySelector('#lbg-name').value,
            'category'          : document.querySelector('#lbg-category').value,
            'id_line'           : document.querySelector('#lbg-id_line').value,
            'penanggung_jawab'  : document.querySelector('#lbg-penanggung_jawab').value,
            'email'             : document.querySelector('#lbg-email').value,
            'instagram'         : document.querySelector('#lbg-instagram').value,
            'web'               : document.querySelector('#lbg-web').value,
            'youtube'           : document.querySelector('#lbg-youtube').value,
            'nomor_hp'          : document.querySelector('#lbg-nomor_hp').value
        }

        $.ajax({
            type        : 'PUT',
            url         : api_url + '/api/Lembaga',
            data        : JSON.stringify(data),
            contentType : 'application/json; charset=utf-8',
            success     : function(result) {
                alert('Data berhasil diubah')
                window.location.reload()
            },
            error       : function(result) {
                console.log(result);
            }
        })
    }

    render() {

        var btnStyle = {
            float   : 'right'
        }

        return (
            <Row>
                <Col lg={12}>
                    <PageHeader>
                        Edit Lembaga '{this.state.name}'
                    </PageHeader>
                </Col>
                <Col lg={12}>
                    <Panel>
                        <Panel.Body>
                            <form>
                                <FormGroup>
                                    <ControlLabel>Nama Lembaga</ControlLabel>
                                    <FormControl id='lbg-name' type='text' placeholder='Masukkan nama kegiatan' name='name' required/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Kategori</ControlLabel>
                                    <FormControl id='lbg-category' componentClass='select'>
                                        <option value='1'>Unit</option>
                                        <option value='2'>Himpunan</option>
                                        <option value='3'>Lainnya</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Penanggung Jawab</ControlLabel>
                                    <FormControl id='lbg-penanggung_jawab' type='text' placeholder='Masukkan nama penanggung jawab'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>No.HP Penanggung Jawab</ControlLabel>
                                    <FormControl id='lbg-nomor_hp' type='text' placeholder='Masukkan no.HP'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl id='lbg-email' type='text' placeholder='Masukkan email'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>ID Line</ControlLabel>
                                    <FormControl id='lbg-id_line' type='text' placeholder='Masukkan ID Line'/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Instagram</ControlLabel>
                                    <FormControl id='lbg-instagram' type='text' placeholder='Masukkan username Instagram'/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Alamat Website</ControlLabel>
                                    <FormControl id='lbg-web' type='text' placeholder='Masukkan alamat web'/>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Youtube</ControlLabel>
                                    <FormControl id='lbg-youtube' type='text' placeholder='Masukkan akun channel Youtube'/>
                                </FormGroup>
                                <Button onClick={this.editLembaga} bsStyle='success' style={btnStyle}>Ubah Lembaga</Button>
                            </form>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default LembagaSingle;