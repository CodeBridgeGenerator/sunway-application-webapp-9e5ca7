import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import CoursesPage from "../CoursesPage/CoursesPage";
import ProgrammeDetailsPage from "../ProgrammeDetailsPage/ProgrammeDetailsPage";
import PersonalInformationPage from "../PersonalInformationPage/PersonalInformationPage";
import ContactInformationPage from "../ContactInformationPage/ContactInformationPage";
import SupportingDocumentsPage from "../SupportingDocumentsPage/SupportingDocumentsPage";
import TermsandconditionsPage from "../TermsandconditionsPage/TermsandconditionsPage";
import SchoolPage from "../SchoolPage/SchoolPage";
import IntakesPage from "../IntakesPage/IntakesPage";
import CampusPage from "../CampusPage/CampusPage";
import LocationPage from "../LocationPage/LocationPage";
import ProgrammelevelPage from "../ProgrammelevelPage/ProgrammelevelPage";
import ProgrammePage from "../ProgrammePage/ProgrammePage";
import IntakePage from "../IntakePage/IntakePage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "courses":
                return <CoursesPage />;
case "programmeDetails":
                return <ProgrammeDetailsPage />;
case "personalInformation":
                return <PersonalInformationPage />;
case "contactInformation":
                return <ContactInformationPage />;
case "supportingDocuments":
                return <SupportingDocumentsPage />;
case "termsandconditions":
                return <TermsandconditionsPage />;
case "school":
                return <SchoolPage />;
case "intakes":
                return <IntakesPage />;
case "campus":
                return <CampusPage />;
case "location":
                return <LocationPage />;
case "programmelevel":
                return <ProgrammelevelPage />;
case "programme":
                return <ProgrammePage />;
case "intake":
                return <IntakePage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
