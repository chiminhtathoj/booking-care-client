import { useState } from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";
import "./Specialty.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Specialty(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <div className="section-specialty">
            <div className="specialty-container">
                <div className="specialty-header">
                    <span className="title-section">Chuyên khoa phổ biến</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="specialty-body">
                    <Slider {...settings}>
                        <div className="specialty-customize">
                            <div className="specialty-img" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="specialty-img" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="specialty-img" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="specialty-img" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="specialty-img" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="specialty-img" />
                            <div>Cơ xương khớp</div>
                        </div>
                    </Slider>
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);