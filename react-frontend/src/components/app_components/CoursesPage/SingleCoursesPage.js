import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import ProgrammeDetailsPage from "../ProgrammeDetailsPage/ProgrammeDetailsPage";

const SingleCoursesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [campus, setCampus] = useState([]);
const [location, setLocation] = useState([]);
const [programmeLevel, setProgrammeLevel] = useState([]);
const [intake, setIntake] = useState([]);
const [school, setSchool] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("courses")
            .get(urlParams.singleCoursesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"campus","location","programmeLevel","intake","school"] }})
            .then((res) => {
                set_entity(res || {});
                const campus = Array.isArray(res.campus)
            ? res.campus.map((elem) => ({ _id: elem._id, campusName: elem.campusName }))
            : res.campus
                ? [{ _id: res.campus._id, campusName: res.campus.campusName }]
                : [];
        setCampus(campus);
const location = Array.isArray(res.location)
            ? res.location.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.location
                ? [{ _id: res.location._id, name: res.location.name }]
                : [];
        setLocation(location);
const programmeLevel = Array.isArray(res.programmeLevel)
            ? res.programmeLevel.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.programmeLevel
                ? [{ _id: res.programmeLevel._id, name: res.programmeLevel.name }]
                : [];
        setProgrammeLevel(programmeLevel);
const intake = Array.isArray(res.intake)
            ? res.intake.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.intake
                ? [{ _id: res.intake._id, name: res.intake.name }]
                : [];
        setIntake(intake);
const school = Array.isArray(res.school)
            ? res.school.map((elem) => ({ _id: elem._id, schoolName: elem.schoolName }))
            : res.school
                ? [{ _id: res.school._id, schoolName: res.school.schoolName }]
                : [];
        setSchool(school);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Courses", type: "error", message: error.message || "Failed get courses" });
            });
    }, [props,urlParams.singleCoursesId]);


    const goBack = () => {
        navigate("/courses");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Courses</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>courses/{urlParams.singleCoursesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Programme</label><p className="m-0 ml-3" >{_entity?.programme}</p></div>
            <div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Campus</label>
                    {campus.map((elem) => (
                        <Link key={elem._id} to={`/campus/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.campusName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Location</label>
                    {location.map((elem) => (
                        <Link key={elem._id} to={`/location/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Programme Level</label>
                    {programmeLevel.map((elem) => (
                        <Link key={elem._id} to={`/programmelevel/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Intake</label>
                    {intake.map((elem) => (
                        <Link key={elem._id} to={`/intake/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">School</label>
                    {school.map((elem) => (
                        <Link key={elem._id} to={`/school/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.schoolName}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
                    <TabPanel header="true" leftIcon="pi pi-building-columns mr-2">
                    <ProgrammeDetailsPage/>
                    </TabPanel>
                    
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleCoursesId}
        user={props.user}
        alert={props.alert}
        serviceName="courses"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleCoursesPage);
