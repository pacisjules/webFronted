import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { DeleteStore,getinventory, UPDATEStore} from "../../features/inventories/inventory.js";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Announcement from "./Announcement.jsxx";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.dark.compact.css";

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Summary,
  TotalItem,
  Editing,
  HeaderFilter,
  Export,
  FilterRow,
  Form,
  Popup,
  MasterDetail,
} from "devextreme-react/data-grid";

import { Item } from "devextreme-react/form";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid } from "devextreme/pdf_exporter";
const exportFormats = ["pdf"];

const notesEditorOptions = { height: 100 };

const animationConfig = {
  show: {
    type: 'slide',
    from: {
      top: -100,
      opacity: 0,
    },
    to: {
      top: 0,
      opacity: 1,
    },
  },
  hide: {
    type: 'pop',
    from: {
      scale: 1,
      opacity: 1,
    },
    to: {
      scale: 0.1,
      opacity: 0,
    },
  },
};

function Datatable() {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [datas, setDatas] = useState([]);
  const [Loaddatas, setLoadDatas] = useState([]);
  const [openaskmsg, setOpenaskmsg] = useState('none');
  const [currentID, setCurrentID] = useState('');
  const [currentstoreName, setStoreName] = useState('')

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


   // Adding functions of tables datagrid

   const onExporting = React.useCallback((e) => {
    const doc = new jsPDF();

    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save("Companies.pdf");
    });
  });
  const pageSizes = [5, 10];

  const makereport = () => {
    let itm = JSON.parse(localStorage.getItem("infos"));
    const doc = new jsPDF({
      unit: "pt", // points, pixels won't work properly
    });

    doc.setFontSize(42);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#1ba3f7");
    doc.text("Document Report", 120, 50); // X, Y

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("black");
    doc.text(`ID: ${itm.store_id} User ID:${itm.user_id}`, 40, 75); // X, Y
    doc.setFont("helvetica", "normal");
    doc.text(`Group: ${itm.store_name} Address: ${itm.address} Description: ${itm.description}`, 40, 95); // X, Y
    // Add a colored rectangle
    doc.setFillColor(0, 179, 36);
    doc.rect(40, 120, 520, 3, "F");
    doc.setFont("helvetica", "normal");
    doc.text(
      `This is the report information: Birth`,
      40,
      110
    );
    doc.setFontSize("10");
    doc.text(`Notes:${itm.Notes}.`, 40, 150);

    doc.autoTable({
      head: [columnes.map((column) => column.header)],
      body: data.map((row) => {
        return columnes.map((column) => row[column.dataKey]);
      }),
      styles: {
        hLineWidth: 1,
        vLineWidth: 1,
        cellPadding: 5,
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: ["#e000ac"],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: ["#e000ac"],
        textColor: [255, 255, 255],
        lineColor: ["#e000ac"],
        lineWidth: 0.2,
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
      alternateRowStyles: {
        fillColor: ["#ffc9f3"],
      },
      startY: 190, // sets the starting y coordinate of the table
      margin: { left: 40 }, // sets the left margin of the table
      tableWidth: "auto", // sets the table width to the width of the content
    });

    doc.addImage('download.jpeg', 'JPEG', 40, 350, 150, 150);
    doc.setTextColor("#f500bc");
    doc.textWithLink('Click here to go to Google', 240, 450, { url: 'https://www.google.com' });

    doc.save(`${itm.store_name}` + ".pdf");
  };

  const data = [
    { name: "John Doe", age: 25 },
    { name: "Jane Doe", age: 30 },
    { name: "Bob Smith", age: 45 },
    { name: "Alice Johnson", age: 35 },
  ];

  const columnes = [
    { header: "Name", dataKey: "name" },
    { header: "Age", dataKey: "age" },
  ];

  //End of Data functions


  const getdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/all_stores?page=1&size=50", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadDatas(response.data.items))
  }

  useEffect(() => {
    getdata()
    dispatch(getinventory(Loaddatas))
  }, []);

//   const mytbl = useSelector((state) => state.sections.sectionstbl);
//   console.log(mytbl)



  
  const closemsgbox = ()=>{
    setOpenaskmsg('none')
  }


  const DltStore = ()=>{
    //  const tkn = session.user.token;
    //  const Did = currentID;
    //  dispatch(DeleteStore({Did, tkn}))
    //  setLoadDatas((current) => current.filter((item) => item.store_id !== Did));
    //  setOpenaskmsg('none')
    //  enqueueSnackbar(`Not Possible to Delete Store`, { variant: "error" });
     router.push('/inventory/Announcement');
  }
  
  
  const Update_info = (e) => {
    const tkn = session.user.token;
    let today = new Date();

    const infos = {
      store_id: e.data.store_id,
      user_id: localStorage.getItem('id'),
      store_name: e.data.store_name,
      address: e.data.address,
      org_setting_id:localStorage.getItem('org_id'),
      description: e.data.description,
      status: e.data.status == true ? '1' : '0',
      created_at: e.data.created_at,
      last_update_at: today.toLocaleDateString()
    };

    //group send variables to Redux
    dispatch(UPDATEStore({ infos, tkn }));

    enqueueSnackbar(`${e.data.store_name} has been updated`, { variant: "success" });
  }
  
  function cellRender(e) {
    return (
      <>
        {e.data.status == "1" ? "Active" : "Not Active"}
      </>
    );
  }

  return (
    <div
      style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
      }}
    >

      <Announcement storeName={currentstoreName} setopen={openaskmsg} closeBox={closemsgbox} deleteStore={DltStore}/>

      <div style={{
        width: "90%",
        height: "400px",
        backgroundColor: "white",
      }}>
      <DataGrid
          id="grid-container"
          dataSource={Loaddatas}
          keyExpr="store_id"
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          editing={{
            allowAdding: false,
            allowDeleting: true,
            allowUpdating: true,
            mode: "popup"
          }}
          onRowUpdated={Update_info}

          onExporting={onExporting}
          onRowRemoved={DltStore}
          width={"100%"}
          style={{
            showBorders: true,
            showTitle: true,
          }}
        >


          <Column dataField="store_id" caption="Group ID" dataType="Guid" allowEditing={false} width={70} visible={false} />
          <Column dataField="store_name" />
          <Column dataField="address" />
          <Column dataField="description" />

          <Column dataField="status"
            width={100}
            allowSorting={false}
            cellRender={cellRender}
            allowEditing={false}
          />

          <Column dataField="status" dataType="boolean" visible={false} />

          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
          >
            <Popup
              title="Store Information"
              showTitle={true}
              width={700}
              height={525}
            />

            <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="store_id" visible={false} />
                <Item dataField="store_name" />
                <Item dataField="address" />
                <Item dataField="description" />
                <Item dataField="status" />
              </Item>
            </Form>
          </Editing>

          <Paging defaultPageSize={5} />
          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />

          <GroupPanel visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Grouping autoExpandAll={true} />

          <Export
            enabled={true}
            formats={exportFormats}
            allowExportSelectedData={true}
          />

          <MasterDetail
            enabled={true}
            component={(e) => {
              return (
                <div>

                  {Loaddatas
                    .filter((item) => item.store_id === e.data.key)
                    .map((itm) => {
                      return (
                        <div
                          style={{
                            backgroundColor: "#009fe3",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <h3>
                            Store name: {itm.store_name} and Status: {itm.status == "1" ? "Activated" : "Not Active"}
                          </h3>
                          <br />

                          {localStorage.setItem("infos", JSON.stringify(itm))}
                          <button onClick={makereport}>Print information</button>
                          <br />
                        </div>
                      );
                    })}
                </div>
              );
            }}
          />

          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />

          <Summary>
            <TotalItem column="store_name" summaryType="count" />

            {/* <TotalItem column="Salary" summaryType="sum" valueFormat="currency" /> */}
          </Summary>
        </DataGrid>
      </div>
    </div>
  );
}


export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Datatable />
    </SnackbarProvider>
  );
}