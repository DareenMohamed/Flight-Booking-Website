//import logo from './logo.svg';

import Login from './Components/Admin/Login'
import CreateFlight from './Components/Admin/CreateFlight'
import AllFlights from './Components/Admin/AllFlights'
import UpdateFlight from './Components/Admin/UpdateFlight'
import Home from './Components/User/HomePage'
import DepartingResults from './Components/User/DepartingResults'
import SeatPicker from './Components/User/SeatPicker'
import SeatEditor from './Components/User/SeatEditor'
import ReturningResults from './Components/User/ReturningResults'
// import CreateFlight from './Components/CreateFlight'
import Seats from './Components/User/Seats'
import './App.css';
import { createBrowserHistory } from "history";
//import { Route, Link } from "react-router-dom"
import Tabs from './Components/Admin/Tabs'
import SearchPage from './Components/Admin/SearchPage'

import SummaryPage from "./Components/User/SummaryPage"
import ViewAllReservations from './Components/User/ViewAllReservations'
import { Router, Route, Switch } from "react-router-dom";
import ViewUserInfo from './Components/User/ViewUserInfo';
import UpdateUserInfo from './Components/User/UpdateUserInfo'
import UpdateUserInfoNew from './Components/User/UpdateUserInfoNew'
import ChangePassword from './Components/User/ChangePassword'
import UserLogin from "./Components/User/Login"
import UserLogin2 from "./Components/User/LoginCopy"
import UserRegistration from './Components/User/Registration'
import ChangePage from './Components/User/ChangePage'
import ChangePage2 from './Components/User/ChangePage2'
import Payment from "./Components/User/PaymentPage"
import InfoForm from './Components/User/PassengersFunctional'
import FullSummaryPage from './Components/User/SummaryPage2'
function App() {
  var hist = createBrowserHistory();
  return (
    <div className='App '>

      {/* <Route exact path="/" component={HomePage} /> */}

      {/* <AllFlights /> */}
      {/* <Tabs /> */}
      <Router history={hist}>
        <Route exact path="/" component={Home} />
        <Route exact path="/DepartingFlights" component={DepartingResults} />
        <Route exact path="/ReturningingFlights" component={ReturningResults} />
        <Route exact path="/Admin" component={AllFlights} />
        <Route exact path="/AllFlights" component={AllFlights} />
        <Route exact path="/Search" component={SearchPage} />
        <Route exact path="/Create" component={CreateFlight} />
        <Route exact path="/Update/:id" component={UpdateFlight} />
        <Route exact path="/Seats/:flight" component={SeatPicker} />
        <Route exact path="/EditSeats/:flight" component={SeatEditor} />
        <Route exact path="/Summary" component={SummaryPage} />
        <Route exact path="/pass" component={InfoForm} />
        <Route exact path="/ChangeDepFlight" component={ChangePage} />
        <Route exact path="/ChangeRetFlight" component={ChangePage2} />
        <Route exact path="/ViewAllReservations" component={ViewAllReservations} />
        {/* add /:id */}
        <Route exact path="/UpdateUserInfo/:id" component={UpdateUserInfoNew} /> 
        <Route exact path="/UpdateUserInfoNew/:id" component={UpdateUserInfoNew} /> 
        <Route exact path="/ChangePassword/:id" component={ChangePassword} /> 
        <Route exact path="/UpdateUserInfo/:id" component={UpdateUserInfoNew} />
        <Route exact path="/login" component={UserLogin2} />
        <Route exact path="/Payment/:type" component={Payment} />
        {/* add /:id */}
        <Route exact path="/ViewUserInfo" component={ViewUserInfo} />
        <Route exact path="/Userlogin" component={UserLogin2} />
        <Route exact path="/Userlogin2" component={UserLogin2} />
        <Route exact path="/FullSummaryPage" component={FullSummaryPage} />
        <Route exact path="/register" component={UserRegistration} />

      </Router>
    </div>
  )
}

export default App;
