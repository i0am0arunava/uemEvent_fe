/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import UserAccountPage from './pages/UserAccountPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AddEvent from './pages/AddEvent'
import EventPage from './pages/EventPage'
import CalendarView from './pages/CalendarView'
import OrderSummary from './pages/OrderSummary'
import PaymentSummary from './pages/PaymentSummary'

import RoleBase from './pages/RoleBase'
import CheckStatus from './pages/CheckStatus'
import CreatEvent from './pages/CreateEvent'
import RoomAllot from './pages/RoomAllot'
import Student from './pages/Student'

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider> 
    <Routes>
            
      <Route path='/' element={<Layout />}>
        <Route index element = {<IndexPage />} />
        <Route path='/useraccount' element = {<UserAccountPage />}/>
        <Route path='/createEvent' element = {<AddEvent/>} />
        <Route path='/event/:id' element= {<EventPage/>} />
        <Route path='/calendar' element={<CalendarView />} />
        <Route path='/checkrole' element={<RoleBase />}/>
        <Route path='/event/:id/ordersummary' element = {<OrderSummary />} />
        <Route path='/status/:id' element = {<CheckStatus />} />
        <Route path='/room/:id' element = {<RoomAllot />} />
        <Route  path="/student/:id" element = {<Student />} />
        
      </Route>

      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/forgotpassword' element = {<ForgotPassword/>} />
      <Route path='/resetpassword' element = {<ResetPassword/>} />
      <Route path='/event/:id/ordersummary/paymentsummary' element = {<PaymentSummary />} />
      
    
    </Routes>
    </UserContextProvider>  
  )
}

export default App
