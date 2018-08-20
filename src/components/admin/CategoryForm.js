/* global $ */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import api_url from 'configs/config'

class CategoryForm extends Component {

    postNewCategory = () => {
        let data = {
            "name"  : document.querySelector('input[name=name]').value
        }

        $.ajax({
            type        : 'POST',
            url         : api_url + '/api/Category',
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
    }

    render() {

        var btnStyle = {
            float   : 'right'
        }

        return (
            <form>
                <FormGroup>
                    <ControlLabel>Nama Kategori</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan nama kategori' name='name'/>
                </FormGroup>
                <Button onClick={this.postNewCategory} bsStyle='success' style={btnStyle}>Tambah Kategori</Button>
            </form>
        );
    }
}

export default CategoryForm