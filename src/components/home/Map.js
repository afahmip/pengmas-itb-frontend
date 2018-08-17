/* global google */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import api_url from 'configs/config';
import 'css/map.css';

class Map extends Component {
    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.initMap = this.initMap.bind(this);
        this.getMarker = this.getMarker.bind(this);
    }

    componentDidMount() {
        this.getMarker();
    }

    initMap = markerData => {
        let indonesia = {lat: -1.8409802, lng: 119.93084848};
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: indonesia,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8ec3b9"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1a3646"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#64779e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#334e87"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6f9ba5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3C7680"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#304a7d"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2c6675"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#255763"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#b0d5ce"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3a4762"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0e1626"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4e6d70"
                        }
                    ]
                }
            ]
        });

        markerData.forEach(element => {
            this.addMarker(element, map);
        });
    }

    getMarker = () => {
        axios.get(api_url + '/api/Activity').then(res => {
            this.initMap(res.data.data);
        });
    }

    // Adds a marker to the map.
    addMarker = (data, map) => {      
        let location = {
            lat: data['lat'],
            lng: data['lng']
        };

        let marker = new google.maps.Marker({
            position: location,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/micons/red-dot.png", // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
            },
            map: map
        });
        
        let infowindow = new google.maps.InfoWindow({
            content: this.createInfoWindow(data)
        });

        marker.addListener('click', function(e) {
            infowindow.open(map, marker);
        });
    }

    createInfoWindow = data => {
        return ReactDOMServer.renderToStaticMarkup(
            <div>
                <h2>{data.name}</h2>
                <h4>{'Lembaga: ' + data.lembaga_name}</h4>
                <a href={`/kegiatan/${data.id}`}>Lihat selengkapnya</a>
                {/* <Link to={`/kegiatan/${data.id}`}>Lihat selengkapnya</Link> */}
            </div>
        );
    }

    splitLocation = (location) => {
        let lokasi = location.toString().substr(1).slice(0, -1).split(" ");
        let lat = lokasi[0].slice(0, -1);
        let lng = lokasi[1];
        return {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        };
    }

    render() {
        let mapStyle = {
            height: '700px'
        };

        return (
            <div id='map-grid'>
                <div id='map-panel'>
                    <div id='map-panel__title'>
                        <h1>Persebaran Kegiatan</h1>
                        <h1>Pengabdian Masyarakat</h1>
                        <p>Demi mewujudkan Tri Dharma Perguruan Tinggi, ITB telah memberikan kontribusi<br/> kepada masyarakat melalui kegiatan pengabdian masyarakat yang dibagi menjadi<br/> <i>Community Service</i>, <i>Community Development</i>, dan KKN Tematik. Sampai saat ini kegiatan<br/> pengabdian masyarakat tersebut telah mencakup berbagai daerah di Indonesia.</p>
                    </div>
                </div>
                <div style={mapStyle} id='map'/>
            </div>
        );
    }
}

export default Map;