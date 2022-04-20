import { useState } from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";


function MedicalFacility(props) {
    return (
        <div className="section-share section-medical-facility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Cơ sở y tế nổi bật</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...props.settings}>
                        <div className="section-customize">
                            <div className="section-img section-medical-facility" />
                            <div>Bệnh viện y học cổ truyền trung ương</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-medical-facility" />
                            <div>Bệnh viện y học cổ truyền trung ương</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-medical-facility" />
                            <div>Bệnh viện y học cổ truyền trung ương</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-medical-facility" />
                            <div>Bệnh viện y học cổ truyền trung ương</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-medical-facility" />
                            <div>Bệnh viện y học cổ truyền trung ương</div>
                        </div>
                        <div className="section-customize">
                            <div className="section-img section-medical-facility" />
                            <div>Bệnh viện y học cổ truyền trung ương</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);