import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
// Styles
import "./TripList.css"

export default function TripList() {

    // Dependency for useEffect where storing url as component state
    const [url, setUrl] = useState('http://localhost:3000/trips')

    // Calling the custom useFetch hook
    const { data: trips, isPending, error, options } = useFetch(url, { type: 'GET'})


    return (
        <div className="trip-list">
            <h2>Trip List</h2>
            {/* Loading message while isPending is true */}
            {isPending && <div>Loading trips...</div>}
            {error && <div>{error}</div>}
            <ul>
                {trips && trips.map(trip => (
                    <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                ))}
            </ul>
            <div className='filters'>
            
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>
                    European Trips
                </button>
                <button onClick={() => setUrl('http://localhost:3000/trips')}>
                    All Trips
                </button>
            </div>
        </div>
    )
}