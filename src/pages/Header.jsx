import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from 'react-icons/rx';
import { BsFillCaretDownFill, BsSearch, BsMicFill } from 'react-icons/bs';
import { RiVideoAddLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef();
  const nav = useNavigate();

  // Fetch events from the server
  useEffect(() => {
    axios.get("/events").then((response) => {
      setEvents(response.data);
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  // Search bar functionality
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  async function logout() {
    await axios.post('/logout');
    setUser(null);
    nav('/login');
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <header className='mt-4 flex justify-between items-center px-4 h-14 bg-gray-900 sticky top-0 z-50 '>
        {/* Left section - Logo and menu */}
       

        {/* Middle section - Search bar */}
        <div className="flex items-center justify-center flex-grow max-w-2xl mx-4">
          <div className='flex w-full'>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2 border border-gray-600 bg-gray-800 rounded-l-full focus:outline-none focus:border-blue-500"
                ref={searchInputRef}
              />
              {searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {events
                    .filter((event) =>
                      event.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((event) => (
                      <div key={event._id} className="p-2 hover:bg-gray-100">
                        <Link to={"/event/" + event._id}>
                          <div className="text-black text-sm">{event.title}</div>
                        </Link>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button className="px-5 py-2 bg-gray-700 border border-l-0 border-gray-600 rounded-r-full hover:bg-gray-200">
              <BsSearch className="text-gray-100" />
            </button>
          </div>
          <button className="ml-4 p-2 bg-gray-600 rounded-full hover:bg-gray-900">
            <BsMicFill className="text-black" />
          </button>
        </div>

        {/* Right section - Icons and user menu */}
        <div className="flex items-center space-x-4">
          {!!user && (
            <>
              <Link to={'/createEvent'} className="p-2 hover:bg-gray-600 rounded-full">
                <RiVideoAddLine className="text-xl text-gray-300" />
              </Link>
              
              <button className="p-2 hover:bg-gray-600 rounded-full relative">
                <IoMdNotificationsOutline className="text-xl text-gray-300" />
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>

              {/* Wallet/My Events link based on role */}
              <Link to={'/checkrole'}
                    className="p-2 hover:bg-gray-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                </svg>
               
              </Link>

              {/* Calendar link */}
              <Link to={'/calendar'} className="p-2 hover:bg-gray-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 text-gray-300">
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
              </Link>
              
              <div className="relative">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => setisMenuOpen(!isMenuOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <BsFillCaretDownFill className="ml-1 text-gray-600" />
                </div>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-50 border border-gray-900">
                    <div className="px-4 py-2 border-b border-gray-900">
                     
                      <div className="text-xs text-gray-500">@{user.name}</div>
                    </div>
                    <Link 
                      to={'/useraccount'} 
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                    >
                      Your account
                    </Link>
                    <Link 
                      to={'/createEvent'} 
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                    >
                      Create Event
                    </Link>
                  
                    <Link to={'/checkrole'}> {/*TODO:Route wallet page after creating it */}
            <div className='block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700'>
             
              {user?.userRole == 'event-organiser' ? <div>My Events</div> : user?.userRole == 'hod' ? <div>Check Events</div> : <div>Wallet</div>}
            </div >
          </Link>
                    <Link 
                      to={'/calendar'} 
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                    >
                      Calendar
                    </Link>
                    <div className="border-t border-gray-900"></div>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {!user && (
            <Link to={'/login'} className="flex items-center space-x-2 border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50">
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}