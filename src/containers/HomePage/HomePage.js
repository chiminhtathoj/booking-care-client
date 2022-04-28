import { useState } from "react";
import { connect } from 'react-redux';
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import Handbook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function HomePage() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 150,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <>

            <HomeHeader isShowBanner={true} />
            <Specialty settings={settings} />
            <MedicalFacility settings={settings} />
            <OutstandingDoctor settings={settings} />
            <Handbook settings={settings} />
            <About />
            <HomeFooter />


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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);