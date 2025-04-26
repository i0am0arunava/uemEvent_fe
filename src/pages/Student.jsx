import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../UserContext"
import './scroll.css'
import { RxCross2 } from "react-icons/rx";
export default function RoleBase() {
  const { user } = useContext(UserContext)
  const { id } = useParams();

  const [fetchedUser, setFetchedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ticket, setTicket] = useState(null)
  const [idt, hallId, seatNo, eventId] = id.split('_');


  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      if (!idt) return

      try {
        setLoading(true)
        setError(null)
        const res = await axios.get("/userDet", {
          params: { idt }
        })
        setFetchedUser(res.data)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError("Failed to fetch user details")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [idt])


  useEffect(() => {
    const fetchTicket = async () => {
      if (!idt || !eventId) return;

      try {
        console.log("daddds",{userid:idt,eventid:eventId})
        const res = await axios.get('/tickitUser', {
          params: {
            userid: idt,
            eventid: eventId
          }
        });

        setTicket(res.data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      }
    };

    fetchTicket();
  }, [idt, eventId]);



  console.log("Fetched Ticket:", ticket?.ticketDetails?.qr);





  return (
    <>

      <div className="font-inter flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="mt-[-100px] p-10 relative h-[700px] w-[1300px] bg-gray-800/60 backdrop-blur-sm  text-white rounded-2xl border border-gray-700 shadow-2xl" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>

          <div className="max-w-6xl w-full relative">

            {/* SVG Arrow */}
            {/* SVG Arrows */}
            <svg
              className="hidden md:block absolute left-[260px] top-[170px] w-[460px] h-[300px] pointer-events-none"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="8"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#818cf8" />
                </marker>
              </defs>

              {/* Arrow to Ticket Info (curved) */}
              <path
                d="M 10 180 C 100 120, 200 250, 280 100"
                stroke="#818cf8"
                strokeWidth="2"
                strokeDasharray="6,6"
                fill="none"
                markerEnd="url(#arrowhead)"
              />

              {/* Arrow to Seminar Info (new one) */}
              <path
                d="M 10 200 C 100 200, 200 300, 280 250"
                stroke="#818cf8"
                strokeWidth="2"
                strokeDasharray="6,6"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            </svg>


            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10 relative">

              {/* Profile Card */}
              <div className="relative">
                <div className="mt-[160px]  mb-6 text-sm text-gray-400 text-center"></div>

                {loading && <div className="text-center text-gray-300">Loading user details...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {fetchedUser && (
                  <div className="mt-[10px] mr-[140px] bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
                    <img
                      src={fetchedUser.profilePic || "https://ui-avatars.com/api/?name=" + fetchedUser.name}
                      alt="Profile"
                      className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-white mb-1">{fetchedUser.name}</h2>
                    <p className="text-gray-400 mb-3">{fetchedUser.email}</p>
                    <span className="px-4 py-1 bg-indigo-600 rounded-full text-sm font-medium tracking-wide uppercase">
                      {fetchedUser.userRole}
                    </span>
                  </div>
                )}

                {!loading && !error && !fetchedUser && (
                  <div className="text-center text-gray-500">No user data available</div>
                )}
              </div>

              {/* Ticket + Seminar Info */}
              {fetchedUser && (
                <div className="space-y-20">

                  {/* Ticket Info */}
                  <div
                    onClick={() => setShowPopup(true)}
                    className="bg-gray-800 rounded-2xl shadow-xl p-6 space-y-1 mt-[40px] w-[370px] relative cursor-pointer hover:shadow-2xl transition"
                  >
                    <h3 className="text-xl font-semibold text-white text-center mb-4">
                      Student Ticket Info
                    </h3>

                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Ticket ID:</span>
                      <span>{fetchedUser.ticketId || "N/A"}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Issue:</span>
                      <span>{fetchedUser.ticketIssue || "No issue"}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Status:</span>
                      <span className={`font-semibold ${fetchedUser.ticketStatus === "Resolved" ? "text-gray-500" : "text-gray-500"}`}>
                        {fetchedUser.ticketStatus || "Pending"}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Last Updated:</span>
                      <span>{fetchedUser.ticketUpdated || "N/A"}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Scan It:</span>
                    </div>

                    <button className="p-1 flex text-[10px] justify-between text-black h-auto w-auto bg-gray-500 rounded-md">
                      <span className="font-medium">Approve it</span>
                    </button>

                    {ticket?.ticketDetails?.qr && (
                      <img
                        src={ticket.ticketDetails.qr}
                        alt="QR Code"
                        className="w-20 h-20 object-contain rounded-md absolute bottom-4 right-4"
                      />
                    )}
                  </div>

                  {/* ✅ Popup Palette Modal */}
                  {showPopup && (
                    
                    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                      <button onClick={() => setShowPopup(false)} className=" absolute ml-[280px] mb-[280px] p-1 flex text-[40px] justify-between text-green-300 h-auto w-auto rounded-md">
                      <span className="font-medium"><RxCross2 /></span>
                    </button>
                      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                     
                      {ticket?.ticketDetails?.qr && (
                      <img
                        src={ticket.ticketDetails.qr}
                        alt="QR Code"
                        className="w-52 h-52 "
                      />
                    )}
                      
                        
                      </div>
                    </div>
                  )}


                  {/* Seminar Info */}
                  <div className=" bg-gray-800 rounded-2xl shadow-xl p-6 space-y-2 hover:shadow-2xl transition">
                    <h3 className="text-xl font-semibold text-white text-center mb-4">
                      Seminar Hall Information
                    </h3>
                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Hall Name:</span>
                      <span>Sminar Hall-{hallId}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Topic:</span>
                      <span>{fetchedUser.seminarTopic || "Not Assigned"}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Date:</span>
                      <span>{fetchedUser.seminarDate || "TBD"}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Time:</span>
                      <span>{fetchedUser.seminarTime || "TBD"}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span className="font-medium">Location:</span>
                      <span>No-{seatNo}</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
