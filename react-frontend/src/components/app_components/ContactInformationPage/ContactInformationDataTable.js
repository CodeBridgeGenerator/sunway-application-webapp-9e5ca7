import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const ContactInformationDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.name?.name}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.fullCorrespondenceAddress}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.city}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.postalCode}</p>
const state = JSON.parse('{"0":"Johor","1":"Kedah","2":"Kelantan","3":"Melaka","4":"NegeriSembilan","5":"Pahang","6":"Penang","7":"Perak","8":"Perlis","9":"Sabah","10":"Sarawak","11":"Selangor","12":"Terengganu","13":"KualaLumpur"}');
const dropdownObjectTemplate4 = (rowData, { rowIndex }) => <p >{state[rowData.state]}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.country}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.studentMobileNumber}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.homeContactNumber}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.studentEmail}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.permanentAddress}</p>
const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.parentGuardianName}</p>
const dropdownArrayTemplate11 = (rowData, { rowIndex }) => <p >{rowData.relationship}</p>
const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.parentGuardianMobileNumber}</p>
const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.parentGuardianEmail}</p>
const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.parentGuardianOfficeNumber}</p>
const dropdownArrayTemplate15 = (rowData, { rowIndex }) => <p >{rowData.monthlyHouseholdIncome}</p>
const pTemplate16 = (rowData, { rowIndex }) => <p >{rowData.emergencyContactName}</p>
const dropdownArrayTemplate17 = (rowData, { rowIndex }) => <p >{rowData.emergencyContactRelationship}</p>
const pTemplate18 = (rowData, { rowIndex }) => <p >{rowData.emergencyContactNumber}</p>
const pTemplate19 = (rowData, { rowIndex }) => <p >{rowData.emergencyContactEmail}</p>
const pTemplate20 = (rowData, { rowIndex }) => <p >{rowData.emergencyContactOfficeNumber}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="name" header="Name" body={dropdownTemplate0} filter={selectedFilterFields.includes("name")} hidden={selectedHideFields?.includes("name")}  style={{ minWidth: "8rem" }} />
<Column field="fullCorrespondenceAddress" header="FullCorrespondenceAddress" body={pTemplate1} filter={selectedFilterFields.includes("fullCorrespondenceAddress")} hidden={selectedHideFields?.includes("fullCorrespondenceAddress")}  sortable style={{ minWidth: "8rem" }} />
<Column field="city" header="City" body={pTemplate2} filter={selectedFilterFields.includes("city")} hidden={selectedHideFields?.includes("city")}  sortable style={{ minWidth: "8rem" }} />
<Column field="postalCode" header="PostalCode" body={pTemplate3} filter={selectedFilterFields.includes("postalCode")} hidden={selectedHideFields?.includes("postalCode")}  sortable style={{ minWidth: "8rem" }} />
<Column field="state" header="State" body={dropdownObjectTemplate4} filter={selectedFilterFields.includes("state")} hidden={selectedHideFields?.includes("state")}  style={{ minWidth: "8rem" }} />
<Column field="country" header="Country" body={pTemplate5} filter={selectedFilterFields.includes("country")} hidden={selectedHideFields?.includes("country")}  sortable style={{ minWidth: "8rem" }} />
<Column field="studentMobileNumber" header="StudentMobileNumber" body={pTemplate6} filter={selectedFilterFields.includes("studentMobileNumber")} hidden={selectedHideFields?.includes("studentMobileNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="homeContactNumber" header="HomeContactNumber" body={pTemplate7} filter={selectedFilterFields.includes("homeContactNumber")} hidden={selectedHideFields?.includes("homeContactNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="studentEmail" header="StudentEmail" body={pTemplate8} filter={selectedFilterFields.includes("studentEmail")} hidden={selectedHideFields?.includes("studentEmail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="permanentAddress" header="PermanentAddress" body={pTemplate9} filter={selectedFilterFields.includes("permanentAddress")} hidden={selectedHideFields?.includes("permanentAddress")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentGuardianName" header="Parent Guardian Name" body={pTemplate10} filter={selectedFilterFields.includes("parentGuardianName")} hidden={selectedHideFields?.includes("parentGuardianName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="relationship" header="Relationship" body={dropdownArrayTemplate11} filter={selectedFilterFields.includes("relationship")} hidden={selectedHideFields?.includes("relationship")}  style={{ minWidth: "8rem" }} />
<Column field="parentGuardianMobileNumber" header="Parent Guardian Mobile Number" body={pTemplate12} filter={selectedFilterFields.includes("parentGuardianMobileNumber")} hidden={selectedHideFields?.includes("parentGuardianMobileNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentGuardianEmail" header="Parent Guardian Email" body={pTemplate13} filter={selectedFilterFields.includes("parentGuardianEmail")} hidden={selectedHideFields?.includes("parentGuardianEmail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="parentGuardianOfficeNumber" header="Parent Guardian Office Number" body={pTemplate14} filter={selectedFilterFields.includes("parentGuardianOfficeNumber")} hidden={selectedHideFields?.includes("parentGuardianOfficeNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="monthlyHouseholdIncome" header="Monthly Household Income" body={dropdownArrayTemplate15} filter={selectedFilterFields.includes("monthlyHouseholdIncome")} hidden={selectedHideFields?.includes("monthlyHouseholdIncome")}  style={{ minWidth: "8rem" }} />
<Column field="emergencyContactName" header="Emergency Contact Name" body={pTemplate16} filter={selectedFilterFields.includes("emergencyContactName")} hidden={selectedHideFields?.includes("emergencyContactName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyContactRelationship" header="Emergency Contact Relationship" body={dropdownArrayTemplate17} filter={selectedFilterFields.includes("emergencyContactRelationship")} hidden={selectedHideFields?.includes("emergencyContactRelationship")}  style={{ minWidth: "8rem" }} />
<Column field="emergencyContactNumber" header="Emergency Contact Number" body={pTemplate18} filter={selectedFilterFields.includes("emergencyContactNumber")} hidden={selectedHideFields?.includes("emergencyContactNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyContactEmail" header="Emergency Contact Email" body={pTemplate19} filter={selectedFilterFields.includes("emergencyContactEmail")} hidden={selectedHideFields?.includes("emergencyContactEmail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="emergencyContactOfficeNumber" header="Emergency Contact OfficeNumber" body={pTemplate20} filter={selectedFilterFields.includes("emergencyContactOfficeNumber")} hidden={selectedHideFields?.includes("emergencyContactOfficeNumber")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload ContactInformation Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="contactInformation"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search ContactInformation" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ContactInformationDataTable;