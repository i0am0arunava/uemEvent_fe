import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, CircleDot } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";


export default function CheckStatus() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);

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

    const statuses = [
        {
            name: "Event Creation",

            isComplete: true,

        },
        {
            name: "Request For Approval",

            isComplete: true,

        },
        {
            name: "HOD Approval",

            isComplete: event?.Status == "Approved"

        },
        {
            name: "Live",

            isComplete: event?.Status == "Approved"


        },
        {
            name: "Students Enrolment",

            isComplete: false,
            updateInprogress: event?.Status == "Approved"


        },
        {
            name: "Room Allotment",

            isComplete: false,
            updateInprogress: false  //until we dont allocate room 

        }
    ];
    return (

        <>


            <Link to="/checkrole" className="text-gray-500 ml-4 inline-block">
                &larr; Back to Previous page
            </Link>
            <div className="p-10 max-w-6xl mx-auto bg-gray-900 text-white rounded-lg ">

                <h1 className="text-3xl font-bold text-center mb-6"> Event Status </h1>
                <p className="text-center text-lg text-gray-400 mb-10">
                    <span className="font-mono text-gray-400">{event?.title}</span>
                </p>

                <div className="relative">
                    {/* Dotted Line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 border-t border-dashed border-gray-400 z-0" />

                    {/* Status Steps */}
                    <div className="flex justify-between relative z-10">
                        {statuses.map((status, index) => (
                            <Link
                                key={index}
                                to={
                                    status.name === 'Event Creation' ? '/' :
                                        status.name === 'Request For Approval' ? '/checkrole' :
                                            status.name === 'Live' && status?.isComplete ? '/' :
                                                (status.name === 'Students Enrolment' && status?.updateInprogress || status.name === 'Room Allotment' && status?.updateInprogress)
                                                    ? `/room/${event?._id}` :
                                                    '#'
                                }
                                className="flex flex-col items-center space-y-2"
                            >
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all duration-300
                    ${status.isComplete
                                            ? 'bg-green-500'
                                            : status?.updateInprogress ? 'bg-gray-900 text-gray-300 border-yellow-400 border-dotted' : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                                        } ${status.isComplete ? 'border-green-400' : 'border-gray-500'}`}
                                >
                                    {status.isComplete && <span className="text-white text-lg">✔</span>}
                                </div>
                                <span className="text-sm text-gray-300 leading-snug">{status.name}</span>
                            </Link>
                        ))}
                    </div>



                </div>
            </div>
        </>
    );
}
