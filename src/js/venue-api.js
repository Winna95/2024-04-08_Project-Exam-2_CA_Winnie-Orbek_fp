import {baseUrl} from "../components/common/constants";

/**
 * Creates a new venue.
 * @param {string} name - The name of the venue.
 * @param {string} description - The description of the venue.
 * @param {string} mediaUrl - The URL of the media (image) for the venue.
 * @param {number} price - The price of the venue.
 * @param {number} maxGuest - The maximum number of guests allowed in the venue.
 * @param {boolean} wifi - Indicates if wifi is available at the venue.
 * @param {boolean} parking - Indicates if parking is available at the venue.
 * @param {boolean} breakfast - Indicates if breakfast is provided at the venue.
 * @param {boolean} pets - Indicates if pets are allowed at the venue.
 * @param {string} address - The address of the venue.
 * @param {string} city - The city of the venue.
 * @param {string} zip - The zip code of the venue.
 * @param {string} country - The country of the venue.
 * @param {string} continent - The continent of the venue.
 * @param {number} lat - The latitude coordinate of the venue location.
 * @param {number} lng - The longitude coordinate of the venue location.
 * @returns {Promise<string[]>} - A promise resolving to an array containing error messages, if any, encountered during the venue creation process.
 */
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

/**
 * Updates an existing venue.
 * @param {string} name - The name of the venue.
 * @param {string} description - The description of the venue.
 * @param {string} mediaUrl - The URL of the media (image) for the venue.
 * @param {number} price - The price of the venue.
 * @param {number} maxGuest - The maximum number of guests allowed in the venue.
 * @param {boolean} wifi - Indicates if wifi is available at the venue.
 * @param {boolean} parking - Indicates if parking is available at the venue.
 * @param {boolean} breakfast - Indicates if breakfast is provided at the venue.
 * @param {boolean} pets - Indicates if pets are allowed at the venue.
 * @param {string} address - The address of the venue.
 * @param {string} city - The city of the venue.
 * @param {string} zip - The zip code of the venue.
 * @param {string} country - The country of the venue.
 * @param {string} continent - The continent of the venue.
 * @param {number} lat - The latitude coordinate of the venue location.
 * @param {number} lng - The longitude coordinate of the venue location.
 * @param {string} venueId - The ID of the venue to be updated.
 * @returns {Promise<string[]>} - A promise resolving to an array containing error messages, if any, encountered during the venue update process.
 */
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

/**
 * Deletes a venue.
 * @param {string} venueId - The ID of the venue to be deleted.
 * @returns {Promise<string[]>} - A promise resolving to an array containing error messages, if any, encountered during the venue deletion process.
 */
export async function deleteVenue(venueId) {
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
        return []

    } else {
        return ["Failed to delete venue"];
    }
}