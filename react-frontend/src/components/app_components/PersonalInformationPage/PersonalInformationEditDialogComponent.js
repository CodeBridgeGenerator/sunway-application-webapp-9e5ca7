import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
const GenderArray = ["male","female"];
const GenderOptions = GenderArray.map((x) => ({ name: x, value: x }));
const maritalStatusArray = ["Single","Married","Divorced","Engaged","Widow"];
const maritalStatusOptions = maritalStatusArray.map((x) => ({ name: x, value: x }));
const relegionArray = ["Buddhist","Christian","Hindu","Sikh","Muslim","Others"];
const relegionOptions = relegionArray.map((x) => ({ name: x, value: x }));
const raceArray = ["Malay","Chinese","Indian","Bajau","Bidayuh","Dusun","Iban","Kadazan","Kadazandusun","Melanau","Murut","OrangAsli","OrangSungai","Punjabi","Sino-Kadazan","Others"];
const raceOptions = raceArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PersonalInformationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name?._id,
fullName: _entity?.fullName,
firstName: _entity?.firstName,
surname: _entity?.surname,
Nationality: _entity?.Nationality,
NRIC: _entity?.NRIC,
DateofBirth: _entity?.DateofBirth,
Gender: _entity?.Gender,
maritalStatus: _entity?.maritalStatus,
relegion: _entity?.relegion,
race: _entity?.race,
studentwithSpecialConditions: _entity?.studentwithSpecialConditions,
formerSunwayStudent: _entity?.formerSunwayStudent,
        };

        setLoading(true);
        try {
            
        await client.service("personalInformation").patch(_entity._id, _data);
        const eagerResult = await client
            .service("personalInformation")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "name",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info personalInformation updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const nameOptions = name.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Personal Information" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="personalInformation-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <Dropdown id="name" value={_entity?.name?._id} optionLabel="name" optionValue="value" options={nameOptions} onChange={(e) => setValByKey("name", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fullName">FullName:</label>
                <InputText id="fullName" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullName} onChange={(e) => setValByKey("fullName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullName"]) && (
              <p className="m-0" key="error-fullName">
                {error["fullName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="firstName">FirstName:</label>
                <InputText id="firstName" className="w-full mb-3 p-inputtext-sm" value={_entity?.firstName} onChange={(e) => setValByKey("firstName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["firstName"]) && (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="surname">Surname:</label>
                <InputText id="surname" className="w-full mb-3 p-inputtext-sm" value={_entity?.surname} onChange={(e) => setValByKey("surname", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["surname"]) && (
              <p className="m-0" key="error-surname">
                {error["surname"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Nationality">Nationality:</label>
                <InputText id="Nationality" className="w-full mb-3 p-inputtext-sm" value={_entity?.Nationality} onChange={(e) => setValByKey("Nationality", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Nationality"]) && (
              <p className="m-0" key="error-Nationality">
                {error["Nationality"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="NRIC">NRIC:</label>
                <InputText id="NRIC" className="w-full mb-3 p-inputtext-sm" value={_entity?.NRIC} onChange={(e) => setValByKey("NRIC", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["NRIC"]) && (
              <p className="m-0" key="error-NRIC">
                {error["NRIC"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="DateofBirth">Date of Birth:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["DateofBirth"]) && (
              <p className="m-0" key="error-DateofBirth">
                {error["DateofBirth"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Gender">Gender:</label>
                <Dropdown id="Gender" value={_entity?.Gender} options={GenderOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("Gender", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Gender"]) && (
              <p className="m-0" key="error-Gender">
                {error["Gender"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="maritalStatus">Marital Status:</label>
                <Dropdown id="maritalStatus" value={_entity?.maritalStatus} options={maritalStatusOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("maritalStatus", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["maritalStatus"]) && (
              <p className="m-0" key="error-maritalStatus">
                {error["maritalStatus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="relegion">Relegion:</label>
                <Dropdown id="relegion" value={_entity?.relegion} options={relegionOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("relegion", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["relegion"]) && (
              <p className="m-0" key="error-relegion">
                {error["relegion"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="race">Race:</label>
                <Dropdown id="race" value={_entity?.race} options={raceOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("race", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["race"]) && (
              <p className="m-0" key="error-race">
                {error["race"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="studentwithSpecialConditions">Student with SpecialConditions:</label>
                <Checkbox id="studentwithSpecialConditions" className="ml-3" checked={_entity?.studentwithSpecialConditions} onChange={(e) => setValByKey("studentwithSpecialConditions", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentwithSpecialConditions"]) && (
              <p className="m-0" key="error-studentwithSpecialConditions">
                {error["studentwithSpecialConditions"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="formerSunwayStudent">Former Sunway Student:</label>
                <Checkbox id="formerSunwayStudent" className="ml-3" checked={_entity?.formerSunwayStudent} onChange={(e) => setValByKey("formerSunwayStudent", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["formerSunwayStudent"]) && (
              <p className="m-0" key="error-formerSunwayStudent">
                {error["formerSunwayStudent"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(PersonalInformationCreateDialogComponent);
