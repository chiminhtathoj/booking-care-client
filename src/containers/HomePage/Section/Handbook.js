import { useState } from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";

function Specialty(props) {

    return (
        <div className="section-share section-handbook">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Chuyên khoa phổ biến</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...props.settings}>
                        <div className="section-customize ">

                            <div className="section-img section-handbook" />
                            <div>Cơ xương khớp</div>

                        </div>
                        <div className="section-customize">
                            <div className="section-img section-handbook" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-handbook" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-handbook" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-handbook" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-handbook" />
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