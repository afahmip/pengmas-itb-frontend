import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import 'css/header.css';

class Header extends Component {
    render() {
        return (
            <div id='header'>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Row id='header-part'>
                                <Col id='header-logo' sm={6}>
                                    <img src={require('./../../assets/itb.png')} alt='logo'/>
                                    <h1>Institut Teknologi Bandung</h1>
                                </Col>
                                <Col sm={6}>
                                    <a href="https://www.instagram.com/lkitb/" target="_blank" rel="noopener noreferrer" title="Instagram"><img className="hf" width="27px" height="27px" src="https://kemahasiswaan.itb.ac.id/assets/img/icon/ig_icon.png" alt='ig'/></a>
                                    <a href="https://www.facebook.com/lembagakemahasiswaanitb" target="_blank" rel="noopener noreferrer" title="Facebook"><img className="hf" width="27px" height="27px" src="https://kemahasiswaan.itb.ac.id/assets/img/icon/fb_icon.png" alt='fb'/></a>
                                    <a href="https://twitter.com/ItbLk" target="_blank"  title="Twitter" rel="noopener noreferrer"><img className="hf" width="27px" height="27px" src="https://kemahasiswaan.itb.ac.id/assets/img/icon/twit_icon.png" alt='twitter'/></a>             
                                    <a href="https://line.me/R/ti/p/%40lk-itb" target="_blank"  title="Line @" rel="noopener noreferrer"><img className="hf" width="27px" height="27px" src="https://kemahasiswaan.itb.ac.id/assets/img/icon/line_icon.png" alt='line'/></a>
                                    <a href="https://www.youtube.com/channel/UCwG1ovOa0G2u_zOzZNswZSw" target="_blank"  title="Youtube" rel="noopener noreferrer"><img className="hf" width="27px" height="27px" src="https://kemahasiswaan.itb.ac.id/assets/img/icon/youtube_icon.png" alt='youtube'/></a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Header;