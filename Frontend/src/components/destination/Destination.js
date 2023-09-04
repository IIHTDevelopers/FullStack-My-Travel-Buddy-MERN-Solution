import React, { useEffect, useState } from 'react';
import AddDestination from './AddDestination';
import AllDestination from './AllDestination';
import DestinationService from './DestinationService';

function Destination() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await DestinationService.getAllDestinations();
                setDestinations(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDestinations();
    }, []);

    const refreshDestinations = async () => {
        try {
            const data = await DestinationService.getAllDestinations();
            setDestinations(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Destination Component</h2>
            <AddDestination refreshDestinations={refreshDestinations} />
            <AllDestination destinations={destinations} refreshDestinations={refreshDestinations} />
        </div>
    );
}

export default Destination;
