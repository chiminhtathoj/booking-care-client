import { useState } from "react";
import { connect } from 'react-redux';
import "./HomeHeader.scss"
import logo from "../../assets/logo.svg"


function HomeHeader() {
    return (
        <>
            <div className="home-header-container">

                <div className="home-header-content">
                    <div className="header-content-left">
                        <i className="fa-solid fa-bars"></i>
                        <img src={logo} alt="logo" className="header-logo" />
                    </div>
                    <div className="header-content-center">
                        <div className="child-content-center"><b>Chuyên khoa</b>
                            <div className="subs-title">Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className="child-content-center"><b>Cơ sở y tế</b>
                            <div className="subs-title">Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className="child-content-center"><b>Bác sĩ</b>
                            <div className="subs-title">Chọn bác sĩ giỏi</div>
                        </div>
                        <div className="child-content-center"><b>Gói khám</b>
                            <div className="subs-title">Khám sức khỏe tổng quát</div>
                        </div>

                    </div>
                    <div className="header-content-right">
                        <div className="header-support"> <i className="fa-solid fa-circle-question"></i>Hỗ trợ</div>
                        <div className="language-vi">VN</div>
                        <div className="language-en">EN</div>
                    </div>
                </div>

                <div className="home-header-banner">
                    <div className="banner-top">
                        <div className="title-first">
                            NỀN TẢNG Y TẾ
                        </div>
                        <div className="title-second">
                            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                        </div>
                        <div className="search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Tìm chuyên khoa" />
                        </div>
                    </div>
                    <div className="banner-bot">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child"><i className="fa-solid fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-mobile"></i></div>
                                <div className="text-child">Khám từ xa</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-stethoscope"></i></div>
                                <div className="text-child">Khám tổng quát</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-microscope"></i></div>
                                <div className="text-child">Xét nghiệm y học</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-user-doctor"></i></div>
                                <div className="text-child">Sức khỏe tinh thần</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-tooth"></i></div>
                                <div className="text-child">Khám nha khoa</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-book-medical"></i></div>
                                <div className="text-child">Gói phẫu thuật</div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child"><i class="fa-solid fa-truck-medical"></i></div>
                                <div className="text-child">Sản phẩm y tế</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);