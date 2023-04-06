import React, {useState} from 'react'
import './AppHeader.css'
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';

function AppHeader() {
    return (<div className="card flex justify-content-center">
        <Card>
            <Badge value="Tracker" size="xlarge" severity="info"></Badge>
        </Card>
        {/* <div className="grid">
          
          <div className="col-12">
            <div className='App-header'>
                <div>                    
                    <Badge value="Tracker" size="xlarge" severity="info"></Badge>
                </div>              
            </div>
          </div>

        </div> */}
    </div>)
}

export default AppHeader