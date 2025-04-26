import { useContext, useEffect, useState } from "react"

import { UserContext } from '../UserContext'
import TicketPage from './TicketPage'
import MyEvent from './MyEvent'
import Approval from './Approval'
export default function RoleBase() {
  const { user } = useContext(UserContext)



  return (
    <>
      {user?.userRole == 'event-organiser' ? <MyEvent /> : user?.userRole == 'user' ? <TicketPage /> : <div><Approval /></div>}

    </>

  )
}