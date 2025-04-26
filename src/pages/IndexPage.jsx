/* eslint-disable react/jsx-key */
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { UserContext } from '../UserContext'

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext)

  //! Fetch events from the server ---------------------------------------------------------------

  useEffect(() => {

    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  console.log("events", events)
  //! Like Functionality --------------------------------------------------------------
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, likes: event.likes + 1 }
              : event
          )
        );
        console.log("done", response)
      })
      .catch((error) => {
        console.error("Error liking ", error);
      });
  };
  console.log("u", user)


  return (
    <>
      <div className="mt-8 flex flex-col">
        <div className="hidden sm:block pl-[60px] pr-[60px]" >
        <div href="#" className="h-[400px] w-full flex items-center justify-center inset-0 p-10 relative bg-gray-800/60 backdrop-blur-sm text-white rounded-md border border-gray-700 shadow-2xl" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
  <div className="text-center max-w-2xl">
    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r bg-gray-300 bg-clip-text text-transparent">WELCOME TO EVENT-MANAGEMENT UEM </h2>
    <p className="mb-6 text-gray-600">Your central hub for managing all events, attendees, and registrations. </p>
    
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">5</div>
        <div className="text-sm text-gray-400">Upcoming Events</div>
      </div>
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">124</div>
        <div className="text-sm text-gray-400">Total Attendees</div>
      </div>
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-white">3</div>
        <div className="text-sm text-gray-400">Active Registrations</div>
      </div>
    </div>
    
   
    
    <div className="mt-6 text-xs text-gray-500">
      Last updated: {new Date().toLocaleString()}
    </div>
  </div>
</div>

        </div>

        <div className="p-8 mt-10 mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5 ">

          {/*-------------------------- Checking whether there is a event or not-------------------  */}
          {events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const currentDate = new Date();

            //! Check the event date is passed or not --------------------------------------------------------------------------------------- 
            if (eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString()) {
              return (
                <div className="bg-gray-800 rounded-xl relative" key={event._id}>
                  <div className='rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9'>
                    {event.image && (
                      <img
                        src={`http://localhost:4000/api/${event.image}`}
                        alt={event.title}
                        width="300"
                        height="200"
                        className="w-full h-full"
                      />
                    )}

                  </div>



                  <img src="../src/assets/ev.png" alt="" className='p-2 rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] object-fill aspect-16:9' />
                  {/* FIXME: This is a demo image after completing the create event function delete this */}

                  <div className="m-2 grid gap-2">
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-lg mt-2">{event.title.toUpperCase()}</h1>
                      <div className="flex gap-2 items-center mr-4 text-gray-300">  <button onClick={() => handleLike(event._id)}>
                        <BiLike className="w-auto h-12 lg:h-10 sm:h-12 md:h-10 bg-gray-900 p-2 rounded-full shadow-md transition-all" />
                      </button> {event.likes}</div>
                    </div>


                    <div className="flex text-sm flex-nowrap justify-between text-gray-500 font-bold mr-4">
                      <div>{event.eventDate.split("T")[0]}, {event.eventTime}</div>
                      <div className="text-green-300">{event.ticketPrice === 0 ? 'Free' : 'Rs. ' + event.ticketPrice}</div>
                    </div>

                    <div className="text-xs flex flex-col flex-wrap truncate-text">{event.description}</div>
                    <div className="flex justify-between items-center my-2 mr-4">
                      <div className="text-sm text-gray-500 ">Organized By: <br /><span className="font-bold">{event.organizedBy}</span></div>
                      <div className="text-sm text-gray-500 ">Created By: <br /> <span className="font-semibold">{event.owner.toUpperCase()}</span></div>
                    </div>
                    <Link to={'/event/' + event._id} className="flex justify-center">
                      <button className="primary flex items-center gap-2">Book Ticket< BsArrowRightShort className="w-6 h-6" /></button>
                    </Link>

                  </div>
                </div>
              )
            }
            return null;
          }
          )}
        </div>
      </div>
    </>

  )
}
