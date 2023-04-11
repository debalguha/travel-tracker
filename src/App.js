import logo from './logo.svg'
import "./App.css"
import MenuLeft from './components/MenuLeft/MenuLeft'
import ListTracker from './components/BodyRight/ListTrackers/ListTracker'
import PrimeReact from 'primereact/api'
//import 'designmodo-flat-ui/dist/css/flat-ui.css';
//import 'designmodo-flat-ui/dist/css/vendor/bootstrap/css/bootstrap.min.css'
//import "primereact/resources/themes/viva-dark/theme.css";     
//import 'primereact/resources/themes/saga-blue/theme.css'
//import 'primereact/resources/themes/arya-green/theme.css'
//import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
//core
import "primereact/resources/primereact.min.css"
//icons
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

import { useRoutes } from "react-router-dom"
//import MainProduct from './components/MainProduct'
import MainTracker from './components/MainTracker'
import TrackerDetail from './components/TrackerDetail'


function App() {

  const routes = useRoutes([   
    { path: "/", element: <MainTracker /> },
    { path: "/:id", element: <TrackerDetail /> }
    // { path: "/list/tracker", element: <ListTracker /> },
    // { path: "/list/tracker", element: <ListTracker /> },
    // { path: "/new/tracker", element: <ListTracker /> },
    // { path: "/search/tracker", element: <ListTracker /> }
  ]);

  return (<div className='App'>
    {/* <div className='grid'>
      <div className='col-3'>
        <MenuLeft />            
      </div>
      <div className='col-8' style={{height: '50rem'}}>
        {routes}
      </div>      
    </div> */}
   {/* <MainProduct /> */}
   {routes}
   {/* <MainTracker /> */}
</div>);
}

export default App;
