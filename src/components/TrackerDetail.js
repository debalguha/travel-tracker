import React, { useEffect, useRef, useState } from 'react'
import { TrackerService } from '../service/TrackerService'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';


export default function TrackerDetail(props) {
    const [selectedTracker, setSelectedTracker] = useState(null)
    const [pageNum, setPageNum] = useState(0);
    const toast = useRef(null);
    const dt = useRef(null)

    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        TrackerService.loadTracker(id, pageNum).then((data) => {
            console.log(data)
            return setSelectedTracker(data)
        })        
    }, [])

    const onPageChange = (event) => {
        setPageNum(event.first);
        TrackerService.loadTracker(id, pageNum).then((data) => {
            console.log(data)
            return setSelectedTracker(data)
        })
    };

    const goBack = () => {
        navigate('/')
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-backward" severity="sucess" className="mr-2" onClick={goBack}/>                    
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

    const getTableData = () => {
        return selectedTracker ? selectedTracker.map((input) => {
            let newInputData = {...input.data}
            newInputData['idRef'] = input.id
            return newInputData
        }) : []
    }

    const getColumns = () => {
        const tableData = getTableData()
        return tableData.length > 0 ? Object.keys(tableData[0]).filter(k => k != 'ideRef').map((col) => (<Column key={col} field={col} header={col} />)) : []
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} />
                    
                        <DataTable 
                            ref={dt}
                            value={getTableData()} 
                            stripedRows
                            size = 'small'
                            dataKey="idRef"
                            className="datatable-responsive"
                            emptyMessage="No Trackers found."
                            header={header}
                            scrollable scrollHeight="600px" tableStyle={{fontSize : '14px'}}>
                        {getColumns()}
                        </DataTable>
                    
                    
                </div>        
            </div>
        </div>
    )
}
