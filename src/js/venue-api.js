const baseUrl = 'https://v2.api.noroff.dev';
export async function createVenue(name, description, mediaUrl, price, maxGuest, wifi, parking, breakfast, pets, address, city, zip, country, continent, lat, lng) {


    const url = baseUrl + '/holidaze/venues';
    const requestBody = {
        name: name,
        description: description,
        media: [
            {
                url: mediaUrl
            }
        ],
        price: price,
        maxGuests: maxGuest,
        meta: {
            wifi: wifi || false,
            parking: parking || false,
            breakfast: breakfast || false,
            pets: pets || false,
        },
        location: {
            address: address || "",
            city: city || "",
            zip: zip || "",
            country: country || "",
            continent: continent || "",
            lat: lat || 0,
            lng: lng || 0
        }
    }
    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        },
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(url, fetchOptions)
    const responseData = await response.json();

    if (
        (responseData.statusCode && responseData.statusCode !== 201) ||
        (responseData.errors && responseData.errors.length > 0)
    ) {
        return responseData.errors.map(error => error.message);
    }

    return [];
}
export async function updateVenue(name, description, mediaUrl, price, maxGuest, wifi, parking, breakfast, pets, address, city, zip, country, continent, lat, lng, venueId) {


    const url = baseUrl + `/holidaze/venues/${venueId}`;
    const requestBody = {
        name: name,
        description: description,
        media: [
            {
                url: mediaUrl
            }
        ],
        price: price,
        maxGuests: maxGuest,
        meta: {
            wifi: wifi || false,
            parking: parking || false,
            breakfast: breakfast || false,
            pets: pets || false,
        },
        location: {
            address: address || "",
            city: city || "",
            zip: zip || "",
            country: country || "",
            continent: continent || "",
            lat: lat || 0,
            lng: lng || 0
        }
    }
    const fetchOptions = {
        method: "PUT",
        headers: {
            'Content-type': "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        },
        body: JSON.stringify(requestBody)
    }
    const response = await fetch(url, fetchOptions)
    const responseData = await response.json();

    if (
        (responseData.statusCode && responseData.statusCode !== 201) ||
        (responseData.errors && responseData.errors.length > 0)
    ) {
        return responseData.errors.map(error => error.message);
    }

    return [];
}

export async function deleteVenue (venueId) {
    const url = baseUrl + `/holidaze/venues/${venueId}`

    const fetchOptions = {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        }
    }
    const response = await fetch(url, fetchOptions)

    if (response.status && response.status === 204) {
        return[]

    } else {
        return ["Failed to delete venue"];
    }
}