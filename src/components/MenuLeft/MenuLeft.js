import React, {useState} from 'react'
import { Dock } from 'primereact/dock'
import { MegaMenu } from 'primereact/megamenu';
import './MenuLeft.css'
import {useNavigate} from 'react-router-dom';

function MenuLeft() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'List Trackers', icon: 'pi pi-fw pi-list',
            command: () => {
                navigate('/list/tracker')
            }
        },
        {
            label: 'New Tracker', icon: 'pi pi-fw pi-plus',
            command: () => {
                navigate('/new/tracker')
            }        
        },
        {
            label: 'Search Trackers', icon: 'pi pi-fw pi-search',
            command: () => {
                navigate('/search/tracker')

            }
            
        },
        
    ];


    return (
        <div className="card">
            <MegaMenu model={items} breakpoint="960px" orientation="vertical" />
        </div>
    )
}

export default MenuLeft