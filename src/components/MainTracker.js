import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { TrackerService } from '../service/TrackerService';

import 'primereact/resources/themes/lara-light-indigo/theme.css'

export default function Tracker() {

    const [trackerMeta, setTrackerMeta] = useState([]);
    const toast = useRef(null);
    const dt = useRef(null)

    const getTrackers = (data) => {
        return [...(data || [])]
    };
    useEffect(() => {
        TrackerService.getTrackerMetaData().then((data) => setTrackerMeta(getTrackers(data)))
    }, [])

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" />
                </div>
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Trackers</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Search..." />
            </span>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} />

                    <DataTable
                        ref={dt}
                        value={trackerMeta}
                        // selection={selectedProducts}
                        // onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        // paginator
                        // rows={10}
                        // rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        // globalFilter={globalFilter}
                        emptyMessage="No Trackers found."
                        header={header}
                        responsiveLayout="scroll">

                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="createdBy" header="Creator" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="restricted" header="Private" sortable headerStyle={{ minWidth: '15rem' }}></Column>                        
                        <Column field="vendor" header="Vendor" sortable></Column>
                        <Column field="creationTime" header="Created at" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>                     
                </div>
            </div>
        </div>
    )
}