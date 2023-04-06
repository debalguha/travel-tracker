import logo from './logo.svg';
import "./App.css"
import AppHeader from './components/Header/AppHeader'
import menuLeft from './components/MenuLeft/MenuLeft'
import PrimeReact from 'primereact/api'
//import 'designmodo-flat-ui/dist/css/flat-ui.css';
//import 'designmodo-flat-ui/dist/css/vendor/bootstrap/css/bootstrap.min.css'
 import "primereact/resources/themes/viva-dark/theme.css";     
//import 'primereact/resources/themes/saga-blue/theme.css'
//import 'primereact/resources/themes/arya-green/theme.css'
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"
import MenuLeft from './components/MenuLeft/MenuLeft';
import { Card } from 'primereact/card';

function App() {
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
    <div className="App" style={{background: '#818ea1'}}>
      <div className="container">
        <div className='grid' >
          <div className="col-4 col-offset-4">
            <AppHeader />  
            <div style={{marginTop: '10px'}}>
              
                <Card>
                  <MenuLeft />
                </Card>           
              

            </div>

          </div>
        </div>        
      </div>
    </div>

  );
}

export default App;
