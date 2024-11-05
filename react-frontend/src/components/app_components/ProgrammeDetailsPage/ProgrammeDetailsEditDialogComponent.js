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

const ProgrammeDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])
const [campus, setCampus] = useState([])
const [location, setLocation] = useState([])
const [programmeLevel, setProgrammeLevel] = useState([])
const [programme, setProgramme] = useState([])
const [intake, setIntake] = useState([])

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
 useEffect(() => {
                    //on mount courses
                    client
                        .service("courses")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCoursesId } })
                        .then((res) => {
                            setCampus(res.data.map((e) => { return { name: e['campus'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Courses", type: "error", message: error.message || "Failed get courses" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name?._id,
campus: _entity?.campus?._id,
location: _entity?.location?._id,
programmeLevel: _entity?.programmeLevel?._id,
programme: _entity?.programme?._id,
intake: _entity?.intake?._id,
        };

        setLoading(true);
        try {
            
        await client.service("programmeDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("programmeDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "name",
                    service : "users",
                    select:["name"]},{
                    path : "campus",
                    service : "courses",
                    select:["campus"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info programmeDetails updated successfully" });
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
const campusOptions = campus.map((elem) => ({ name: elem.name, value: elem.value }));
const locationOptions = location.map((elem) => ({ name: elem.name, value: elem.value }));
const programmeLevelOptions = programmeLevel.map((elem) => ({ name: elem.name, value: elem.value }));
const programmeOptions = programme.map((elem) => ({ name: elem.name, value: elem.value }));
const intakeOptions = intake.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Programme Details" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="programmeDetails-edit-dialog-component">
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
                <label htmlFor="campus">Campus:</label>
                <Dropdown id="campus" value={_entity?.campus?._id} optionLabel="name" optionValue="value" options={campusOptions} onChange={(e) => setValByKey("campus", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["campus"]) && (
              <p className="m-0" key="error-campus">
                {error["campus"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="location">Location:</label>
                <Dropdown id="location" value={_entity?.location?._id} optionLabel="name" optionValue="value" options={locationOptions} onChange={(e) => setValByKey("location", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) && (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="programmeLevel">ProgrammeLevel:</label>
                <Dropdown id="programmeLevel" value={_entity?.programmeLevel?._id} optionLabel="name" optionValue="value" options={programmeLevelOptions} onChange={(e) => setValByKey("programmeLevel", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["programmeLevel"]) && (
              <p className="m-0" key="error-programmeLevel">
                {error["programmeLevel"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="programme">Programme:</label>
                <Dropdown id="programme" value={_entity?.programme?._id} optionLabel="name" optionValue="value" options={programmeOptions} onChange={(e) => setValByKey("programme", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["programme"]) && (
              <p className="m-0" key="error-programme">
                {error["programme"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="intake">Intake:</label>
                <Dropdown id="intake" value={_entity?.intake?._id} optionLabel="name" optionValue="value" options={intakeOptions} onChange={(e) => setValByKey("intake", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["intake"]) && (
              <p className="m-0" key="error-intake">
                {error["intake"]}
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

export default connect(mapState, mapDispatch)(ProgrammeDetailsCreateDialogComponent);
