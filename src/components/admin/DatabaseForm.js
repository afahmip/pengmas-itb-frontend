/* global google */
/* global $ */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import MapStyle from 'components/partials/Map'
import api_url from 'configs/config'

class DatabaseForm extends Component {
    constructor(props) {
        super(props)

        this.initMap = this.initMap.bind(this)
        this.initLembagaOption = this.initLembagaOption.bind(this)
        this.initCategoryOption = this.initCategoryOption.bind(this)
        this.state = {
            name    : '',
            lembaga : '',
            lat     : '',
            lng     : '',
            marker  : '',
        }
    }

    componentDidMount() {
        this.initMap()
        this.initLembagaOption()
        this.initCategoryOption()
    }

    initLembagaOption = () => {
        let placeholder = document.querySelector('#database__lembaga')

        $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Lembaga',
            success     : function(result) {
                createOption(result.data)
            },
            error       : function(result) {
                console.log(result)
            }
        })

        function createOption(data) {
            data.forEach(e => {
                let option = document.createElement('option')
                option.value = e.id
                option.innerHTML = e.name
                placeholder.appendChild(option)
            })
        }
    }

    initCategoryOption = () => {
        let placeholder = document.querySelector('#database__category')

        $.ajax({
            type        : 'GET',
            url         : api_url + '/api/Category',
            success     : function(result) {
                createOption(result.data)
            },
            error       : function(result) {
                console.log(result)
            }
        })

        function createOption(data) {
            data.forEach(e => {
                let option = document.createElement('option')
                option.value = e.id
                option.innerHTML = e.name
                placeholder.appendChild(option)
            })
        }
    }

    initMap = () => {
        var indonesia = {lat: -1.8409802, lng: 119.93084848}
        var map = new google.maps.Map(document.getElementById('admin-map'), {
            zoom: 5,
            center: indonesia,
            styles: MapStyle
        })

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', event => {
            this.addMarker(event.latLng, map)
        })
    }

    addMarker = (location, map) => {
        let marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.BOUNCE,
            map: map
        })
        let position = this.splitLocation(location)

        if(this.state.marker) {
            this.state.marker.setMap(null)
        }

        this.setState({
            lat     : position.lat,
            lng     : position.lng,
            marker  : marker
        })
    }

    splitLocation = location => {
        let lokasi = location.toString().substr(1).slice(0, -1).split(' ')
        return {
            lat: parseFloat(lokasi[0].slice(0, -1)),
            lng: parseFloat(lokasi[1])
        }
    }

    setFormEmpty = () => {
        document.querySelector('input[name=name]').value = ''
        this.setState({
            name    : '',
            lembaga : '',
            lat     : '',
            lng     : '',
            marker  : '',
        })
    }

    postNewActivity = () => {
        // event.preventDefault()

        this.setState({
            name    : $('input[name=name]').val(),
            lembaga : $('#database__form-select :selected').val()
        })

        let data = {
            "lat"           : this.state.lat,
            "lng"           : this.state.lng,
            "name"          : document.querySelector('input[name=name]').value,
            "lembaga_id"    : document.querySelector('#database__lembaga').value,
            'category_id'   : document.querySelector('#database__category').value,
            'description'   : document.querySelector('textarea[name=description]').value,
            'goal'          : document.querySelector('textarea[name=goal]').value,
            'target'        : document.querySelector('textarea[name=target]').value,
            'time'          : document.querySelector('input[name=time]').value
        }

        $.ajax({
            type        : 'POST',
            url         : api_url + '/api/Activity',
            data        : JSON.stringify(data),
            contentType : 'application/json; charset=utf-8',
            success     : function(result) {
                alert('Data berhasil ditambahkan')
                window.location.reload()
            },
            error       : function(result) {
                console.log(result)
            }
        })

        this.setFormEmpty()
    }

    render() {
        var mapStyle = {
            height  : '400px',
            width   : '100%'
        }

        var btnStyle = {
            float   : 'right'
        }

        return (
            <form>
                <FormGroup>
                    <ControlLabel>Nama Kegiatan</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan nama kegiatan' name='name' required/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Nama Lembaga</ControlLabel>
                    <FormControl componentClass='select' id='database__lembaga'></FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Kategori</ControlLabel>
                    <FormControl componentClass='select' id='database__category'></FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Deskripsi</ControlLabel>
                    <FormControl componentClass='textarea' placeholder='Masukkan deskripsi kegiatan' name='description'></FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Tujuan Kegiatan</ControlLabel>
                    <FormControl componentClass='textarea' placeholder='Masukkan tujuan kegiatan' name='goal'></FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Sasaran Kegiatan</ControlLabel>
                    <FormControl componentClass='textarea' placeholder='Masukkan sasaran kegiatan' name='target'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Waktu Kegiatan</ControlLabel>
                    <FormControl type='text' placeholder='Masukkan waktu kegiatan' name='time'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Lokasi Kegiatan</ControlLabel>
                    <div id='admin-map' style={mapStyle}/>
                </FormGroup>
                <Button onClick={this.postNewActivity} bsStyle='success' style={btnStyle}>Tambah Kegiatan</Button>
            </form>
        )
    }
}

export default DatabaseForm