import { HashRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import CustomerData from './components/CustomerData';
import CustomerLog from './components/CustomerLog';
import CustomerLogTable from './components/CustomerLogTable';


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element ={<CustomerLog/>} >
          </Route>
          <Route exact path="/customer-record/:filename" element ={<CustomerData/>} >
          </Route>
          <Route exact path="/download/:filename" element ={<CustomerLogTable/>} >
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
