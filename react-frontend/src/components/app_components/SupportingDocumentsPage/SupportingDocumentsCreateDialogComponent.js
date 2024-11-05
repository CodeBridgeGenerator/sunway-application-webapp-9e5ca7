import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import UploadFilesToS3 from "../../../services/UploadFilesToS3";
const educationLevelArray = ["SecondaryStudies","Year12Equivalents","TertiaryStudies","Others"];
const educationLevelOptions = educationLevelArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const SupportingDocumentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [name], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.passportPhoto)) {
                error["passportPhoto"] = `Passport Photo field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.NRICCopy)) {
                error["NRICCopy"] = `NRIC Copy field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.School)) {
                error["School"] = `School field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.academicDocuments)) {
                error["academicDocuments"] = `Academic Documents field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name?._id,passportPhoto: _entity?.passportPhoto,NRICCopy: _entity?.NRICCopy,educationLevel: _entity?.educationLevel,School: _entity?.School,academicDocuments: _entity?.academicDocuments,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("supportingDocuments").create(_data);
        const eagerResult = await client
            .service("supportingDocuments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "name",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info SupportingDocuments updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in SupportingDocuments" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount users
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
        <Dialog header="Create SupportingDocuments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="supportingDocuments-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <Dropdown id="name" value={_entity?.name?._id} optionLabel="name" optionValue="value" options={nameOptions} onChange={(e) => setValByKey("name", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="passportPhoto">Passport Photo:</label>
                    <UploadFilesToS3 type={'create'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["passportPhoto"]) ? (
                  <p className="m-0" key="error-passportPhoto">
                    {error["passportPhoto"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="NRICCopy">NRIC Copy:</label>
                    <UploadFilesToS3 type={'create'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["NRICCopy"]) ? (
                  <p className="m-0" key="error-NRICCopy">
                    {error["NRICCopy"]}
                  </p>
                ) : null}
              </small>
                </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="educationLevel">EducationLevel:</label>
                <Dropdown id="educationLevel" value={_entity?.educationLevel} options={educationLevelOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("educationLevel", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["educationLevel"]) ? (
              <p className="m-0" key="error-educationLevel">
                {error["educationLevel"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="School">School:</label>
                <InputText id="School" className="w-full mb-3 p-inputtext-sm" value={_entity?.School} onChange={(e) => setValByKey("School", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["School"]) ? (
              <p className="m-0" key="error-School">
                {error["School"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="academicDocuments">Academic Documents:</label>
                    <UploadFilesToS3 type={'create'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleSupportingDocumentsId} serviceName="supportingDocuments" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["academicDocuments"]) ? (
                  <p className="m-0" key="error-academicDocuments">
                    {error["academicDocuments"]}
                  </p>
                ) : null}
              </small>
                </div>
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

export default connect(mapState, mapDispatch)(SupportingDocumentsCreateDialogComponent);
