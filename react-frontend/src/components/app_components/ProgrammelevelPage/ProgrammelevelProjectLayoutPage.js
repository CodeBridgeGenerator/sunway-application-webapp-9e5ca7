import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import ProgrammelevelPage from "./ProgrammelevelPage";

const ProgrammelevelProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <ProgrammelevelPage />
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

export default connect(mapState, mapDispatch)(ProgrammelevelProjectLayoutPage);