import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import "./ManageDoctor.scss"
import * as action from "../../../store/actions/"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { toast } from "react-toastify";
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTION } from "../../../utils/"
import { getDetailDoctorByIdAPI } from "../../../services/doctorService"
import _ from 'lodash';
function ManageDoctor(props) {
    const [contentHTML, setContentHTML] = useState("")
    const [contentMarkdown, setcontentMarkdown] = useState("")
    const [descDoctor, setdescDoctor] = useState("")
    const [hasOldData, setHasOldData] = useState(false)
    const [nameClinic, setNameClinic] = useState("")
    const [addressClinic, setAddressClinic] = useState("")
    const [note, setNote] = useState("")

    const [listDoctors, setlistDoctors] = useState([])
    const [listPrices, setListPrices] = useState([])
    const [listPayments, setListPayments] = useState([])
    const [listProvinces, setListProvinces] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState("")
    const [selectedPrice, setSelectedPrice] = useState("")
    const [selectedPayment, setSelectedPayment] = useState("")
    const [selectedProvince, setSelectedProvince] = useState("")


    useEffect(() => {
        props.getAllDoctorStart()
        props.getMultiDetailInfoDoctorStart()
    }, [])
    useEffect(() => {
        setlistDoctors(props.allDoctors)
    }, [props.allDoctors])
    useEffect(() => {
        setListPrices(props.multiDataDoctors.price)
        setListPayments(props.multiDataDoctors.payment)
        setListProvinces(props.multiDataDoctors.province)
    }, [props.multiDataDoctors])
    const mdParser = new MarkdownIt();
    function handleEditorChange({ html, text }) {
        setContentHTML(html)
        setcontentMarkdown(text)
    }
    const handleBtnSave = async () => {
        if (!selectedDoctor || !selectedDoctor.value) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.selectedDoctor" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!descDoctor) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.description" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!selectedPrice || !selectedPrice.value) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.selectedPrice" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }

        if (!selectedPayment || !selectedPayment.value) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.selectedPayment" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!selectedProvince) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.selectedProvince" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!nameClinic) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.nameClinic" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!addressClinic) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.addressClinic" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!contentHTML) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.contentHTML" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        if (!contentMarkdown) {
            toast.error(<FormattedMessage id="admin.manage-doctor.error.contentMarkdown" />, {
                position: "top-center",
                theme: "colored"
            })
            return
        }
        await props.saveInfoDoctorStart(
            {
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: descDoctor,
                doctorId: selectedDoctor.value,
                action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
                priceId: selectedPrice.value,
                paymentId: selectedPayment.value,
                provinceId: selectedProvince.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note
            }
        )
    }

    const handleChangeText = (e, type) => {
        switch (type) {
            case "nameClinic":
                setNameClinic(e.target.value)
                break
            case "addressClinic":
                setAddressClinic(e.target.value)
                break
            case "note":
                setNote(e.target.value)
                break
            case "description":
                setdescDoctor(e.target.value)
                break
            default:
                console.log("handleChangeText", "something wrong")
        }

    }
    const handleOnChangeSelect = async (selectedDoctor) => {
        setSelectedDoctor(selectedDoctor)
        const res = await getDetailDoctorByIdAPI(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data) {
            const markdown = res.data.Markdown
            const doctorInfo = res.data.Doctor_Info
            if (markdown && !_.isEmpty(markdown)) {
                setHasOldData(true)
                setContentHTML(markdown.contentHTML)
                setdescDoctor(markdown.description)
                setcontentMarkdown(markdown.contentMarkdown)
            }
            else {
                setHasOldData(false)
                setContentHTML("")
                setdescDoctor("")
                setcontentMarkdown("")
            }
            if (doctorInfo && !_.isEmpty(doctorInfo)) {
                setNameClinic(doctorInfo.nameClinic)
                setAddressClinic(doctorInfo.addressClinic)
                setNote(doctorInfo.note)
                if (doctorInfo.paymentId) {
                    const currentPayment = listPayments.find(item => {
                        if (item.keyMap === doctorInfo.paymentId)
                            return item
                    })
                    const currentPrice = listPrices.find(item => {
                        if (item.keyMap === doctorInfo.priceId)
                            return item
                    })
                    const currentProvince = listProvinces.find(item => {
                        if (item.keyMap === doctorInfo.provinceId)
                            return item
                    })
                    if (currentPayment && props.language === LANGUAGES.VI)
                        setSelectedPayment({ label: currentPayment.valueVi, value: currentPayment.keyMap })
                    if (currentPayment && props.language === LANGUAGES.EN)
                        setSelectedPayment({ label: currentPayment.valueEn, value: currentPayment.keyMap })
                    if (currentPrice && props.language === LANGUAGES.VI)
                        setSelectedPrice({ label: currentPrice.valueVi + " VND", value: currentPrice.keyMap })
                    if (currentPrice && props.language === LANGUAGES.EN)
                        setSelectedPrice({ label: currentPrice.valueEn + " $", value: currentPrice.keyMap })
                    if (currentProvince && props.language === LANGUAGES.VI)
                        setSelectedProvince({ label: currentProvince.valueVi, value: currentProvince.keyMap })
                    if (currentProvince && props.language === LANGUAGES.EN)
                        setSelectedProvince({ label: currentProvince.valueEn, value: currentProvince.keyMap })
                }
            }
            else {
                setNameClinic("")
                setAddressClinic("")
                setNote("")
                setSelectedPayment("")
                setSelectedPrice("")
                setSelectedProvince("")
            }
        }
        else {
            setHasOldData(false)
            setContentHTML("")
            setdescDoctor("")
            setcontentMarkdown("")
            setNameClinic("")
            setAddressClinic("")
            setNote("")
            setSelectedPayment("")
            setSelectedPrice("")
            setSelectedProvince("")
        }
    }
    const handleOptionSelect = (inputData, type) => {
        let result = []
        if (inputData && inputData.length > 0) {
            if (type === "doctor") {
                inputData.map((input, index) => {
                    let obj = {}
                    let labelVi = `${input.lastName} ${input.firstName}`
                    let labelEn = `${input.firstName} ${input.lastName}`
                    obj.label = props.language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = input.id
                    result.push(obj)
                })
            }
            if (type === "price") {
                inputData.map((input, index) => {
                    let obj = {}
                    let labelVi = `${input.valueVi} VND`
                    let labelEn = `${input.valueEn} $`
                    obj.label = props.language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = input.keyMap
                    result.push(obj)
                })
            }
            if (type === "payment") {
                inputData.map((input, index) => {
                    let obj = {}
                    let labelVi = `${input.valueVi} `
                    let labelEn = `${input.valueEn} `
                    obj.label = props.language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = input.keyMap
                    result.push(obj)
                })
            }
            if (type === "province") {
                inputData.map((input, index) => {
                    let obj = {}
                    let labelVi = `${input.valueVi} `
                    let labelEn = `${input.valueEn} `
                    obj.label = props.language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = input.keyMap
                    result.push(obj)
                })
            }

        }

        return result
    }
    const handleChangeDoctorInfoSelect = (selected, name) => {
        if (name.name === "selectedPrice")
            setSelectedPrice(selected)
        if (name.name === "selectedPayment")
            setSelectedPayment(selected)
        if (name.name === "selectedProvince")
            setSelectedProvince(selected)

    }
    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title title"><FormattedMessage id="admin.manage-doctor.title" /></div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label htmlFor=""> <FormattedMessage id="admin.manage-doctor.select-doctor" /> </label>
                    <Select
                        defaultValue={selectedDoctor}
                        onChange={handleOnChangeSelect}
                        options={handleOptionSelect(listDoctors, "doctor")}
                    //placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                    />
                </div>
                <div className="content-right">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.intro" /></label>
                    <textarea name="" id="" cols="30" rows="3"
                        className='form-control'
                        value={descDoctor}
                        onChange={(e) => handleChangeText(e, "description")}
                    >
                    </textarea>
                </div>

            </div>
            <div className="info-detail row">
                <div className="col-4 form-group">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.price" /></label>
                    <Select
                        value={selectedPrice}
                        onChange={handleChangeDoctorInfoSelect}
                        options={handleOptionSelect(listPrices, "price")}
                        name="selectedPrice"
                    //placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                    />
                </div>
                <div className="col-4 form-group">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.payment" /></label>
                    <Select
                        value={selectedPayment}
                        onChange={handleChangeDoctorInfoSelect}
                        options={handleOptionSelect(listPayments, "payment")}
                        name="selectedPayment"
                    //placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                    />
                </div>
                <div className="col-4 form-group">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.province" /></label>
                    <Select
                        value={selectedProvince}
                        onChange={handleChangeDoctorInfoSelect}
                        options={handleOptionSelect(listProvinces, "province")}
                        name="selectedProvince"
                    //placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                    />
                </div>
                <div className="col-4 form-group">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                    <input
                        type="text"
                        className='form-control'
                        value={nameClinic}
                        onChange={(e) => handleChangeText(e, "nameClinic")}
                    //placeholder={<FormattedMessage id="admin.manage-doctor.name-clinic" />}
                    />
                </div>
                <div className="col-4 form-group">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                    <input
                        type="text"
                        className='form-control'
                        value={addressClinic}
                        onChange={(e) => handleChangeText(e, "addressClinic")}
                    //placeholder={<FormattedMessage id="admin.manage-doctor.address-clinic" />}
                    />
                </div>
                <div className="col-4 form-group">
                    <label htmlFor=""><FormattedMessage id="admin.manage-doctor.note" /></label>
                    <input
                        type="text"
                        className='form-control'
                        value={note}
                        onChange={(e) => handleChangeText(e, "note")}
                    //placeholder={<FormattedMessage id="admin.manage-doctor.note" />}
                    />
                </div>
            </div>
            <MdEditor
                style={{ height: '500px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                value={contentMarkdown}
            />
            <button

                className={hasOldData === true ? "btn btn-primary px-2 mt-2" : "btn btn btn-success px-2 mt-2"}
                onClick={handleBtnSave}
            >
                {hasOldData === true ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}
            </button>
        </div>

    )

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.doctor.allDoctors,
        multiDataDoctors: state.doctor.multiDataDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorStart: () => dispatch(action.getAllDoctorStart()),
        saveInfoDoctorStart: (infoDoctor) => dispatch(action.saveInfoDoctorStart(infoDoctor)),
        getMultiDetailInfoDoctorStart: () => dispatch(action.getMultiDetailInfoDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);