import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import "./ManageDoctor.scss"
import * as action from "../../../store/actions/adminAction"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
function ManageDoctor(props) {
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [contentHTML, setContentHTML] = useState("")
    const [contentMarkdown, setcontentMarkdown] = useState("")
    const [descDoctor, setdescDoctor] = useState("")

    const mdParser = new MarkdownIt();
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    function handleEditorChange({ html, text }) {
        setContentHTML(html)
        setcontentMarkdown(text)
    }

    const handleBtnSave = () => {
        console.log(contentHTML, contentMarkdown, descDoctor, selectedDoctor)
    }

    const handleOnChangeDesc = (e) => {
        setdescDoctor(e.target.value)

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
                        options={options}
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
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);