import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./ManageDoctor.scss"
import * as action from "../../../store/actions/"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from "../../../utils/"
function ManageDoctor(props) {
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [contentHTML, setContentHTML] = useState("")
    const [contentMarkdown, setcontentMarkdown] = useState("")
    const [descDoctor, setdescDoctor] = useState("")
    const [allDoctors, setallDoctors] = useState([])
    useEffect(() => {
        props.getAllDoctorStart()
    }, [])
    useEffect(() => {
        setallDoctors(props.allDoctors)
    }, [props.allDoctors])

    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        setContentHTML(html)
        setcontentMarkdown(text)
    }

    const handleBtnSave = () => {
        props.saveInfoDoctorStart(
            {
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: descDoctor,
                doctorId: selectedDoctor.value
            }
        )
    }

    const handleOnChangeDesc = (e) => {
        setdescDoctor(e.target.value)
        console.log(allDoctors)
    }
    const handleOptionSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((input, index) => {
                let obj = {}
                let labelVi = `${input.lastName} ${input.firstName}`
                let labelEn = `${input.firstName} ${input.lastName}`
                obj.label = props.language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = input.id
                result.push(obj)
            })

        }
        return result
    }

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title title">Thông tin bác sĩ</div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label htmlFor=""> Chọn bác sĩ </label>
                    <Select
                        defaultValue={selectedDoctor}
                        onChange={setSelectedDoctor}
                        options={handleOptionSelect(allDoctors)}
                    />
                </div>
                <div className="content-right">
                    <label htmlFor="">Thông tin giới thiệu</label>
                    <textarea name="" id="" cols="30" rows="7"
                        className='form-control'
                        value={descDoctor}
                        onChange={(e) => handleOnChangeDesc(e)}
                    >
                        chiminhtathoj
                    </textarea>
                </div>

            </div>
            <MdEditor style={{ height: '500px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <button
                className="btn btn-primary px-2 mt-2"
                onClick={handleBtnSave}
            >
                Lưu thông tin
            </button>
        </div>

    )

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.doctor.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorStart: () => dispatch(action.getAllDoctorStart()),
        saveInfoDoctorStart: (infoDoctor) => dispatch(action.saveInfoDoctorStart(infoDoctor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);