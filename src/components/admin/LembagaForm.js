/* global $ */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import api_url from 'configs/config'

class LembagaForm extends Component {

    postNewLembaga = () => {
        let data = {
            "name"              : document.querySelector('input[name=name]').value,
            "category"          : document.querySelector('#lembaga__form-select').value,
            "id_line"           : document.querySelector('input[name=line]').value,
            "instagram"         : document.querySelector('input[name=insta]').value,
            "web"               : document.querySelector('input[name=web]').value,
            "youtube"           : document.querySelector('input[name=youtube]').value,
            "penanggung_jawab"  : document.querySelector('input[name=pj]').value,
            "nomor_hp"          : document.querySelector('input[name=hppj]').value,
            "email"             : document.querySelector('input[name=email]').value,
        }

        $.ajax({
            type        : 'POST',
            url         : api_url + '/api/Lembaga',
            data        : JSON.stringify(data),
            contentType : 'application/json; charset=utf-8',
            success     : function(result) {
                alert('Data berhasil ditambahkan')
                window.location.reload()
            },
            error       : function(result) {
                console.log(result);
            }
        })

        this.setFormEmpty()
    }

    setFormEmpty = () => {
        document.querySelector('input[name=name]').value = ''
        document.querySelector('input[name=line]').value = ''
        document.querySelector('input[name=insta]').value = ''
        document.querySelector('input[name=web]').value = ''
        document.querySelector('input[name=youtube]').value = ''
        document.querySelector('input[name=pj]').value = ''
        document.querySelector('input[name=hppj]').value = ''
        document.querySelector('input[name=email]').value = ''
    }

    render() {

        var btnStyle = {
            float   : 'right'
        }

        return (
            <form>
                <FormGroup>
                    <ControlLabel>Nama Lembaga</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan nama lembaga' name='name'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Kategori</ControlLabel>
                    <FormControl componentClass='select' id='lembaga__form-select' name='tipe'>
                        <option value='1'>Unit</option>
                        <option value='2'>Himpunan</option>
                        <option value='3'>Lainnya</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type='email' placeholder='Masukkan email lembaga' name='email'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Nama Penanggung Jawab</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan nama penanggung jawab' name='pj'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>No.HP Penanggung Jawab</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan no.HP penanggung jawab' name='hppj'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>ID Line</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan ID Line lembaga' name='line'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Instagram</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan akun Instagram lembaga' name='insta'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Website</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan alamat web lembaga' name='web'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Youtube</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan akun Youtube lembaga' name='youtube'/>
                </FormGroup>
                <Button onClick={this.postNewLembaga} bsStyle='success' style={btnStyle}>Tambah Lembaga</Button>
            </form>
        );
    }
}

export default LembagaForm