import React, {useState} from 'react'
import { Dock } from 'primereact/dock'
import './MenuLeft.css'

function MenuLeft() {
    const items = [
        {
            label: 'New Tracker',
            icon: () => <img alt="New" src="../../../icons-tracker/new-tracker.png" width="100%" />,
        },
        {
            label: 'List Tracker',
            icon: () => <img alt="List" src="../../../icons-tracker/list-tracker.png" width="100%" />,
        },
        {
            label: 'Search Tracker',
            icon: () => <img alt="Search" src="../../../icons-tracker/search-tracker.png" width="100%" />,
        }
    ]


    return (
        <div className="dock-demo">
            <div className="dock-window" /*style={{ backgroundImage: 'url(https://primefaces.org/cdn/primereact/images/dock/window.jpg)' }}*/>
                <Dock model={items} position="left" />
            </div>
        </div> 



    )
}

export default MenuLeft