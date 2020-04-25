const LocationService = () => {
    let subscribers = []
    let location = {
        latitude: 0,
        longitude: 0
    }
    let subscribersDistance = []
    let distance = 0

    return {
        subscribe: (sub) => subscribers.push(sub),
        setLocation: (coords) => {
            location = coords
            subscribers.forEach((sub) => sub(location))
        },
        unsubscribe: (sub) => {
            subscribers = subscribers.filter((_sub) => _sub !== sub)
        },
        subscribersDistance: (DistanceSetter) => subscribersDistance.push(DistanceSetter),
        setDistance: (newDistance) => {
            distance = newDistance
            subscribersDistance.forEach((setter => setter(distance)))
        }
    }
}

export default locationService = LocationService()