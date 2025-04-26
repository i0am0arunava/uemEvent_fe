import { useContext, useEffect, useState } from "react"
import { UserContext } from '../UserContext'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { TbProgress } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom"
import axios from "axios";
import './scroll.css'
export default function MyEvent() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/myEvent?email=${user.email}`)
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [user]);
  // Dummy JSON data


  console.log("roleeee", user)
  const displayedEvents = showAll ? events : events.slice(0, 12);
  return (
    <>
      <Link to="/" className="text-gray-500 ml-4 inline-block">
        &larr; Back to Previous page
      </Link>


      <div className="mt-0 p-4">
        <h2 className="text-xl font-bold mb-4 text-white scrol text-center">My Events</h2>
        <div className="overflow-hidden rounded-1xl border border-gray-700">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Event Date</th>
                <th className="py-3 px-4 text-left">Event Time</th>
                <th className="py-3 px-4 text-left">Approved By</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedEvents.map((event, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
                  <td className="py-2 px-4">
                    <Link to={`/event/${event._id}`}>{event.title}</Link>
                  </td>

                  <td className="py-2 px-4">
                    <Link to={`/event/${event._id}`}>{event?.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : "N/A"}</Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/event/${event._id}`}>{event?.eventTime}</Link>
                  </td>
                  <td className="py-2 px-4">
                    <Link to={`/event/${event._id}`}>{event?.ApprovedBy}</Link>
                  </td>
                  <td className="py-2 px-4">
                    {event?.Status === "Approved" ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <IoCheckmarkCircleSharp className="text-xl" /> <span>{event.Status}</span>
                      </span>
                    ) : (
                      event?.Status === "Pending" ? (<span className="flex items-center gap-1 text-yellow-600">
                        <TbProgress className="text-xl" /> <span>{event.Status}</span>
                      </span>) : (<span className="flex items-center gap-1 text-red-300">
                        <MdCancel className="" /> <span>{event.Status}</span>
                      </span>)
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          {events.length > 12 && (
            <div className="text-center mt-4">
              <button
                className="text-blue-400 hover:text-blue-600 font-medium"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "See More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
