import { useEffect, useState, useRef } from "react"

/* Custom Fetch Hook */
export const useFetch = (url, _options) => {

    // state for fetching the data
    const [data, setData] = useState(null)
    // While fetch is pending
    const [isPending, setIsPending] = useState(false)
    // Error state for handling errors
    const [error, setError] = useState(null)



    // use useRef to wrap an object/array argument
    // which is a useEffect dependency
    const options = useRef(_options).current





    // fetching data with useEffect when certain conditions are met 
    useEffect(() => {
        // Abort controller constant
        const controller = new AbortController();

        const fetchData = async () => {
            console.log(options)
            setIsPending(true)

            // Catching only errors when theres network errors
            try {
                // associating abort controller with the fetch request with signal
                const res = await fetch(url, { signal: controller.signal})
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                const json = await res.json()


                setIsPending(false)
                setData(json)
                setError(null)
            } catch (err) {
                // Catching and checking abort error
                if(err.name === "AbortError") {
                    console.log('the fetch was aborted')
                }
                setIsPending(false)
                setError('Could not fetch the data')
                console.log(err.message)
            }
        }
        fetchData()

        // Cleanup function to abort any async tasks or subs to any data stream
        return () => {
            controller.abort();
        }

        // declaring the depandancy
    }, [url, options])

    return { data, isPending, error, }
}



  // when a user clicks on a button we call the function to change the end point 
    // state of the url
    // fetching data with useEffect when certain conditions are met 
    // useEffect(() => {
    //     // Dynamic value 'url' needs to be declared as a dependency because it is 
    //     // define outside useEffect
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(json => setTrips(json))
    //     // declaring the depandancy
    // }, [url])


/* useCallback for function dependencies, async */


    // wrapping the function inside useCallback to stop the infinite loop
    // of fetchTrips by creating a cashed version so memory doesn't change in system
    // function for dependency array
    // const fetchTrips = useCallback(async () => {
    //     const response = await fetch(url)
    //     const json = await response.json()
    //     setTrips(json)
    // Dependency to tell the useEffect when to use this dependency :)
    // },[url])

    // useEffect(() => {
    //     fetchTrips()
    // }, [fetchTrips] )

    // console.log(trips)