import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { TrackerService } from '../service/TrackerService';
import {useNavigate} from 'react-router-dom';


export default function Tracker() {
    let emptyTrackerCampaign = {
        campaignName: '',
        createdBy: 'System',
        restricted: false,
        vendor: null
    }

    const vendors = [
        { name: 'Microsoft', code: 'Microsoft' },
        { name: 'Amazon', code: 'Amazon' },
        { name: 'Redhat', code: 'Redhat' },
        { name: 'Heroku', code: 'Heroku' }
    ]

    const navigate = useNavigate();

    const [tracker, setTracker] = useState(emptyTrackerCampaign)
    const [trackerMeta, setTrackerMeta] = useState([]);
    const [trackerDialog, setTrackerDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
                    <Button label="New" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew}/>
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

    const hideDialog = () => {
        setTrackerDialog(false)
    }

    const openNew = () => {
        setTracker(emptyTrackerCampaign);
        setSubmitted(false);
        setTrackerDialog(true);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _tracker = { ...tracker }
        _tracker[`${name}`] = val;
        
        setTracker(_tracker);
    };

    const onDropdownChange = (e, name) => {
        const val = (e.target && e.target.value.code) || '';
        let _tracker = { ...tracker }
        _tracker[`${name}`] = val;
        
        setTracker(_tracker);
    }

    const onCheckboxChanged = (e, name) => {
        
        let _tracker = { ...tracker }
        _tracker[`${name}`] = e.checked;
        
        setTracker(_tracker);
    }

    const marshallTrackerData = (trackerDataUI) => {
        let trackerDataReturn = { ...trackerDataUI}
        trackerDataReturn.vendor = trackerDataUI.vendor.code
        return trackerDataReturn
    }

    const unMarshallTrackerData = (trackerDataResponse) => {
        let trackerDataReturn = { ...trackerDataResponse}
        trackerDataReturn.vendor = {}
        trackerDataReturn.vendor.name = trackerDataResponse.vendor
        trackerDataReturn.vendor.code = trackerDataResponse.vendor
        return trackerDataReturn
    }

    const saveProduct = () => {
        setSubmitted(true);
        TrackerService.saveTrackerMeta(marshallTrackerData(tracker), (responseTrackerData) => {
            let _trackerMeta = [...trackerMeta];
            //let _tracker = { ...tracker };
            if(responseTrackerData.id) {
                _trackerMeta.push(responseTrackerData)
                setTrackerMeta(_trackerMeta)
                setTracker(emptyTrackerCampaign)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tracker Created', life: 3000 });
            } else {
                toast.current.show({ severity: 'danger', summary: 'Failed', detail: 'Tracker creation failed', life: 3000 });
            }
            setTrackerDialog(false)

        })
    }

    const trackerDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    )

    const trackerSelected = (e) => {        
        console.log(e.data)
        setTracker(unMarshallTrackerData(e.data))
        // setSubmitted(false)
        // setTrackerDialog(true)
        navigate('/'+e.data.campaignName)
        
    }

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
                        responsiveLayout="scroll"
                        onRowClick={trackerSelected}>

                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="campaignName" header="Campaign" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="createdBy" header="Creator" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="restricted" header="Private" sortable headerStyle={{ minWidth: '15rem' }}></Column>                        
                        <Column field="vendor" header="Vendor" sortable></Column>
                        <Column field="creationTime" header="Created at" sortable headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <Dialog visible={trackerDialog} header="New Campaign to Track" modal className="p-fluid" onHide={hideDialog} footer={trackerDialogFooter}>
                        <div className="field">
                                <label htmlFor="campaignName">Campaign</label>
                                <InputText id="campaignName" value={tracker.campaignName} onChange={(e) => onInputChange(e, 'campaignName')} required autoFocus className={classNames({ 'p-invalid': submitted && !tracker.campaignName })} />
                                {submitted && !tracker.campaignName && <small className="p-invalid">Campaign name is required.</small>}
                        </div>
                        <div className="field">
                                <label htmlFor="createdBy">Created By</label>
                                <InputText id="createdBy" value={tracker.createdBy} onChange={(e) => onInputChange(e, 'createdBy')} required disabled className={classNames({ 'p-invalid': submitted && !tracker.createdBy })} />
                                {submitted && !tracker.createdBy && <small className="p-invalid">Creator is required.</small>}
                        </div> 
                        <div className="field">
                                <label htmlFor="restricted">Restricted</label>
                                <br />
                                <Checkbox id="restricted" value={tracker.restricted} onChange={(e) => onCheckboxChanged(e, 'restricted')} checked={tracker.restricted} autoFocus />
                        </div>
                        <div className="field">
                                <label htmlFor="vendor">Vendor</label>
                                <Dropdown value={tracker.vendor} options={vendors} onChange={(e) => onDropdownChange(e, 'vendor')} optionLabel="name" placeholder="Select a Vendor" className={classNames({ 'p-invalid': submitted && !tracker.vendor })} />
                                {submitted && !tracker.vendor && <small className="p-invalid">Creator is required.</small>}
                        </div>                         
                    </Dialog>
                </div>
            </div>
        </div>
    )
}