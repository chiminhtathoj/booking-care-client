import { useState } from "react";
import { connect } from 'react-redux';
import Slider from "react-slick";


function OutstandingDoctor(props) {
    return (
        <div className="section-share section-outstanding-doctor">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...props.settings}>
                        <div className="section-customize ">
                            <div className="outer-border">
                                <div className="outer-bg">
                                    <div className="section-img section-outstanding-doctor" />
                                </div>
                                <div className="outer-text text-center">
                                    <div>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>

                        </div>
                        <div className="section-customize">
                            <div className="outer-border">
                                <div className="outer-bg">
                                    <div className="section-img section-outstanding-doctor" />
                                </div>
                                <div className="outer-text text-center">
                                    <div>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>

                        </div>
                        <div className="section-customize">
                            <div className="outer-border">
                                <div className="outer-bg">
                                    <div className="section-img section-outstanding-doctor" />
                                </div>
                                <div className="outer-text text-center">
                                    <div>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>

                        </div>
                        <div className="section-customize">
                            <div className="outer-border">
                                <div className="outer-bg">
                                    <div className="section-img section-outstanding-doctor" />
                                </div>
                                <div className="outer-text text-center">
                                    <div>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>

                        </div>
                        <div className="section-customize">
                            <div className="outer-border">
                                <div className="outer-bg">
                                    <div className="section-img section-outstanding-doctor" />
                                </div>
                                <div className="outer-text text-center">
                                    <div>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>

                        </div>
                        <div className="section-customize">
                            <div className="outer-border">
                                <div className="outer-bg">
                                    <div className="section-img section-outstanding-doctor" />
                                </div>
                                <div className="outer-text text-center">
                                    <div>Bác sĩ chuyên khoa II Trần Thị Hoài Hương</div>
                                    <div>Da liễu</div>
                                </div>
                            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);