/* global $, google */

import React, { Component } from 'react';
import { Row, Col, PageHeader, FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';
import api_url from 'configs/config';
import MapStyle from 'components/partials/Map';

class DatabaseSingle extends Component {
    state = {
        id: null,
        name: '',
        lat: '',
        lng: '',
        map: null,
        marker: '',
    }

    componentDidMount() {
        const param = this.props.match.params;
        this.setState({ id: param.id });
        this.getData(param.id);
        this.initMap();
        this.initLembagaOption();
        this.initCategoryOption();
    }

    getData = (id) => {
        $.ajax({
            type: 'GET',
            url: api_url + '/api/Activity/' + id.toString(),
            success: (result) => {
                this.setState({
                    name: result.name,
                    lat: result.lat,
                    lng: result.lng
                });
                console.log(this.state.lat);
                this.fillTable(result);
            },
            error: function (result) {
                console.log(result);
            }
        });
    }

    initLembagaOption = () => {
        $.ajax({
            type: 'GET',
            url: api_url + '/api/Lembaga',
            success: function (result) {
                let placeholder = document.querySelector('#act-lembaga')
                result.data.forEach(e => {
                    let option = document.createElement('option')
                    option.value = e.id
                    option.innerHTML = e.name
                    placeholder.appendChild(option)
                })
            },
            error: function (result) {
                console.log(result)
            }
        })
    }

    initCategoryOption = () => {
        $.ajax({
            type: 'GET',
            url: api_url + '/api/Category',
            success: function (result) {
                let placeholder = document.querySelector('#act-category')
                result.data.forEach(e => {
                    let option = document.createElement('option')
                    option.value = e.id
                    option.innerHTML = e.name
                    placeholder.appendChild(option)
                })
            },
            error: function (result) {
                console.log(result)
            }
        })
    }

    initMap = () => {
        let indonesia = { lat: -1.8409802, lng: 119.93084848 }
        let map = new google.maps.Map(document.getElementById('admin-map'), {
            zoom: 5,
            center: indonesia,
            styles: MapStyle
        });
        this.setState({map: map});

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

        if (this.state.marker) {
            this.state.marker.setMap(null)
        }

        this.setState({
            lat: position.lat,
            lng: position.lng,
            marker: marker
        })
    }

    splitLocation = location => {
        let lokasi = location.toString().substr(1).slice(0, -1).split(' ')
        return {
            lat: parseFloat(lokasi[0].slice(0, -1)),
            lng: parseFloat(lokasi[1])
        }
    }

    fillTable = (data) => {
        document.querySelector('#act-name').value = data.name;
        // document.querySelector('#act-lembaga').innerHTML = data.lembaga_name;
        // document.querySelector('#act-category').value = data.category_name || '';
        document.querySelector('#act-desc').value = data.description || '';
        document.querySelector('#act-goal').value = data.goal || '';
        document.querySelector('#act-target').value = data.target || '';
        document.querySelector('#act-time').value = data.time || '';

        let loc = { lat: this.state.lat, lng: this.state.lng };
        let marker = new google.maps.Marker({
            position: loc,
            animation: google.maps.Animation.BOUNCE,
            map: this.state.map
        })
        this.setState({ marker: marker });
    }

    editActivity = () => {
        let data = {
            "id": this.state.id,
            "lat": this.state.lat,
            "lng": this.state.lng,
            "name": document.querySelector('#act-name').value,
            "lembaga_id": document.querySelector('#act-lembaga').value,
            'category_id': document.querySelector('#act-category').value,
            'description': document.querySelector('#act-desc').value,
            'goal': document.querySelector('#act-goal').value,
            'target': document.querySelector('#act-target').value,
            'time': document.querySelector('#act-time').value
        }

        $.ajax({
            type: 'PUT',
            url: api_url + '/api/Activity',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                alert('Data berhasil diubah');
                window.location.reload()
            },
            error: function (result) {
                console.log(result)
            }
        })
    }

    render() {
        var mapStyle = {
            height: '400px',
            width: '100%'
        }

        var btnStyle = {
            float: 'right'
        }

        return (
            <Row>
                <Col lg={12}>
                    <PageHeader>
                        Edit Kegiatan '{this.state.name}'
                    </PageHeader>
                </Col>
                <Col lg={12}>
                    <Panel>
                        <Panel.Body>
                            <form>
                                <FormGroup>
                                    <ControlLabel>Nama Kegiatan</ControlLabel>
                                    <FormControl id='act-name' type='text' placeholder='Masukkan nama kegiatan' name='name' required />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Nama Lembaga</ControlLabel>
                                    <FormControl id='act-lembaga' componentClass='select'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Kategori</ControlLabel>
                                    <FormControl id='act-category' componentClass='select'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Deskripsi</ControlLabel>
                                    <FormControl id='act-desc' componentClass='textarea' rows="5" placeholder='Masukkan deskripsi kegiatan' name='description'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Tujuan Kegiatan</ControlLabel>
                                    <FormControl id='act-goal' componentClass='textarea' rows="5" placeholder='Masukkan tujuan kegiatan' name='goal'></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Sasaran Kegiatan</ControlLabel>
                                    <FormControl id='act-target' componentClass='textarea' rows="2" placeholder='Masukkan sasaran kegiatan' name='target' />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Waktu Kegiatan</ControlLabel>
                                    <FormControl id='act-time' type='text' placeholder='Masukkan waktu kegiatan' name='time' />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Lokasi Kegiatan</ControlLabel>
                                    <div id='admin-map' style={mapStyle} />
                                </FormGroup>
                                <Button onClick={this.editActivity} bsStyle='success' style={btnStyle}>Ubah Kegiatan</Button>
                            </form>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default DatabaseSingle;