import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";
import { useContext } from "react"

import { UserContext } from '../UserContext'
export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useContext(UserContext)
  //! Fetching the event data from server by ID ------------------------------------------
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/event/${id}`).then(response => {
      setEvent(response.data)
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, [id])

  //! Copy Functionalities -----------------------------------------------
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(`${linkToShare}`);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };

  if (!event) return '';
  return (
    <>
      <Link to="/checkrole" className="text-gray-500 ml-4 inline-block">
        &larr; Back to Previous page
      </Link>
      <div className="flex flex-col xl:flex-row bg-gray-900 text-white p-6 gap-10">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="../src/assets/event.png"
            alt=""
            className="rounded-xl object-cover aspect-video w-full max-w-2xl"
           
          />
        </div>






        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-start gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-5xl font-extrabold">{event.title.toUpperCase()}</h1>
            <Link to={
              user.userRole === "event-organiser"
                ? `/status/${event._id}`
                : user.userRole === "hod"
                  ? `/event/${event._id}/manage`
                  : `/event/${event._id}/ordersummary`
            }>
              <button className="bg-gray-700 hover:bg-primarydark text-white px-6 py-2 rounded-xl shadow-md">
                {
                  user.userRole === "event-organiser"
                    ? "Check Status"
                    : user.userRole === "hod"
                      ? "Manage Events"
                      : "Book Ticket"
                }
              </button>
            </Link>


          </div>

          <h2 className="text-md md:text-xl font-bold text-blue-700">
            {event.ticketPrice === 0 ? 'Free' : 'LKR. ' + event.ticketPrice}
          </h2>

          <p className="text-md md:text-lg text-gray-500">{event.description}</p>

          <div className="text-md md:text-xl font-bold text-gray-500">
            Organized By {event.organizedBy}
          </div>

          <div>
            <h3 className="text-md md:text-xl font-extrabold mb-3">When and Where</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <AiFillCalendar className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-bold">Date and Time</p>
                  <p className="text-gray-300 text-sm md:text-base">
                    Date: {event.eventDate.split("T")[0]} <br />
                    Time: {event.eventTime}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MdLocationPin className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-gray-300 text-sm md:text-base">{event.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md md:text-xl font-extrabold mb-3">Share with friends</h3>
            <div className="flex gap-5">
              <button onClick={handleCopyLink} className="hover:text-blue-500">
                <FaCopy className="w-auto h-6" />
              </button>
              <button onClick={handleWhatsAppShare} className="hover:text-green-400">
                <FaWhatsappSquare className="w-auto h-6" />
              </button>
              <button onClick={handleFacebookShare} className="hover:text-blue-500">
                <FaFacebook className="w-auto h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
