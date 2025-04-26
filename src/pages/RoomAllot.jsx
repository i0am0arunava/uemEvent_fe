import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { LiaExchangeAltSolid } from "react-icons/lia";
export default function RoomAllot() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [event, setEvent] = useState(null);

    const [showAllSeats, setShowAllSeats] = useState({});
    const [showAllStudents, setShowAllStudents] = useState(false);

    const [hall, setHall] = useState([]);
    const [finalFitted, setFinalFitted] = useState({
        s1: [],
        s2: [],
        s3: [],
        s4: []
    });


    useEffect(() => {
        if (!id) return;

        axios
            .get(`/event/${id}`)
            .then((response) => {
         
                setEvent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, [id]);


    const studs = event?.students?.map(e => ({
        uid: e?.uid,
        uname: e?.uname
    })) ?? [];


    // best fit algo 
    const seminarHalls = [

        { id: "s1", capacity: 24 },
        { id: "s2", capacity: 30 },
        { id: "s3", capacity: 40 },
        { id: "s4", capacity: 50 },
    ];
    const bestfit = (stude) => {

        const students = stude;



        // Generate all possible combinations of seminar halls
        function getCombinations(arr) {
            const results = [];

            const generate = (combo, start) => {
                results.push(combo);
                for (let i = start; i < arr.length; i++) {
                    generate([...combo, arr[i]], i + 1);
                }
            };

            generate([], 0);
            return results;
        }

        const allCombos = getCombinations(seminarHalls)
            .filter(combo => combo.reduce((sum, hall) => sum + hall.capacity, 0) >= students.length)
            .sort((a, b) => {
                // Sort by fewest seminar halls, then by least unused seats
                const aUnused = a.reduce((sum, h) => sum + h.capacity, 0) - students.length;
                const bUnused = b.reduce((sum, h) => sum + h.capacity, 0) - students.length;
                return a.length - b.length || aUnused - bUnused;
            });

        const chosenCombo = allCombos[0];

        const result = {};
        let studentIndex = 0;
        for (const hall of chosenCombo) {
            const assigned = students.slice(studentIndex, studentIndex + hall.capacity);
            result[hall.id] = assigned;
            studentIndex += assigned.length;
        }

        return (JSON.stringify(result, null, 2));





    }











    const toggleSeats = (hallId) => {
        setShowAllSeats((prev) => ({
            ...prev,
            [hallId]: !prev[hallId],
        }));
    };
    const handleBestFit = async (e) => {
        e.preventDefault();
        console.log("hssad")
        var c = bestfit(studs)
        const parsed = JSON.parse(c);



        try {
            console.log("parse", parsed.s1)
            let s1 = parsed.s1
            const response = await axios.post("/s1", {
                s1
            });
            console.log("Server Response:", response.data.data);
         await fetchData()
           
        } catch (error) {
            console.error("Error in best fit allocation:", error);
        }
    };
  



    const fetchData = async () => {
        try {
            const response = await axios.get('/s1');
            updateHall("s1", response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        fetchData(); // Initial fetch on mount
    }, []);
    

    const updateHall = (hallKey, students) => {
        setFinalFitted(prev => ({
            ...prev,
            [hallKey]: students
        }));
    };


    const seminars = seminarHalls.map(hall => {
        const students = finalFitted[hall.id] || [];
        const seats = Array.from({ length: hall.capacity }).map((_, i) => ({
            student: students[i] || null,
        }));

        return {
            id: hall.id,
            seats,
        };
    });


    console.log("dssa", finalFitted)


    return (

        <>
            <Link to="/checkrole" className="text-gray-500 ml-4 inline-block">
                &larr; Back to Previous page
            </Link>

            <div className="bg-gray-900 flex justify-center px-4 pt-20 ">

                <div className="w-full max-w-6xl bg-gray-900 p-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 mt-[-100px]">
                    {/* Seminar Halls */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Seminar Halls</h2>
                        <div className="space-y-6">
                            {seminars.map((hall) => {
                                const isExpanded = showAllSeats[hall.id];
                                const seatsToShow = isExpanded ? hall.seats : hall.seats.slice(0, 24);

                                return (
                                    <div key={hall.id}>
                                        <h3 className="font-medium text-white mb-2">Seminar Hall {hall.id}</h3>
                                        <div className="grid grid-cols-12 gap-2">
                                            {seatsToShow.map((seat, i) => (
                                                <Link to={`/student/${seat?.student?.uid}_${hall?.id}_${i + 1}_${id}`} key={i}>
                                                    <div
                                                        className={`w-6 h-6 transition rounded-sm shadow-md ${seat.student ? "bg-indigo-500" : "bg-gray-600"
                                                            }`}
                                                        title={seat?.student?.uname}
                                                    />
                                                </Link>
                                            ))}
                                        </div>

                                        {hall.seats.length > 23 && (
                                            <div className="mt-2 text-sm text-center">
                                                <button
                                                    onClick={() => toggleSeats(hall.id)}
                                                    className="text-gray-600 hover:underline"
                                                >
                                                    {isExpanded ? "Show Less" : "Show More"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Vertical Buttons */}
                    <div className="flex flex-col justify-center items-center gap-4">
                        <button
                            onClick={(e) => handleBestFit(e)}
                            className="bg-black hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition w-full max-w-md"
                        >
                            Use Best Fit Algo
                        </button>

                        <LiaExchangeAltSolid className="w-14 h-8" />
                        <button className="bg-black hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition w-full max-w-auto">
                            Allocate Manually
                        </button>
                    </div>

                    {/* Student List */}
                    <div>
                        <h2 className="mt-4 text-2xl font-semibold mb-6 text-center text-white">
                            Student List <span className="text-sm text-gray-400">{event?.title}</span>
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-700 border border-gray-400 rounded-xl overflow-hidden shadow-md">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-600 text-left">Id</th>
                                        <th className="py-2 px-4 border-b border-gray-600 text-left">Student Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studs.slice(0, showAllStudents ? studs?.length : 11).map((student, index) => (
                                        <tr key={index} className="hover:bg-gray-800">
                                            <td className="py-2 px-4 border-b border-gray-600">{index + 1}</td>
                                            <td className="py-2 px-4 border-b border-gray-600">{student?.uname}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {studs.length > 11 && (
                                <div className="mt-3 text-center">
                                    <button
                                        onClick={() => setShowAllStudents(!showAllStudents)}
                                        className="text-gray-600 hover:underline"
                                    >
                                        {showAllStudents ? "Show Less" : "Show More"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}