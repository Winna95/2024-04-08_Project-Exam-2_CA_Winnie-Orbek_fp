const baseUrl = 'https://v2.api.noroff.dev';

/**
 * Retrieves the profile information of the currently logged-in user.
 * @returns {Promise<Object>} - A promise resolving to an object containing the profile data of the user.
 * @throws {string} - Throws an error if the user is not logged in.
 */
export async function getMyProfile() {
    const loggedInUserName = localStorage.getItem("name")
    if (!loggedInUserName) {
        return Promise.reject("Operation failed due to user not having logged in")
    }
    const url = baseUrl + `/holidaze/profiles/${loggedInUserName}`;
    const fetchOptions = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        }
    }
    const response = await fetch(url, fetchOptions)
    const responseData = await response.json()
    return responseData.data
}

/**
 * Retrieves the bookings associated with the currently logged-in user.
 * @returns {Promise<Object[]>} - A promise resolving to an array containing the bookings data of the user.
 * @throws {string} - Throws an error if the user is not logged in.
 */
export async function getMyBookings() {
    const loggedInUserName = localStorage.getItem("name")
    if (!loggedInUserName) {
        return Promise.reject("Operation failed due to user not having logged in")
    }
    const url = baseUrl + `/holidaze/profiles/${loggedInUserName}/bookings?_venue=true`;
    const fetchOptions = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        }
    }
    const response = await fetch(url, fetchOptions)
    const responseData = await response.json()
    return responseData.data
}

/**
 * Retrieves the venues associated with the currently logged-in user.
 * @returns {Promise<Object[]>} - A promise resolving to an array containing the venues data of the user.
 * @throws {string} - Throws an error if the user is not logged in.
 */
export async function getMyVenues() {
    const loggedInUserName = localStorage.getItem("name")
    if (!loggedInUserName) {
        return Promise.reject("Operation failed due to user not having logged in")
    }
    const url = baseUrl + `/holidaze/profiles/${loggedInUserName}/venues?_bookings=true`;
    const fetchOptions = {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        }
    }
    const response = await fetch(url, fetchOptions)
    const responseData = await response.json()
    return responseData.data
}

/**
 * Updates the avatar of the currently logged-in user.
 * @param {string} avatarUrl - The URL of the new avatar image.
 * @returns {Promise<string[]>} - A promise resolving to an array containing error messages, if any, encountered during the update process.
 */
export async function updateAvatar(avatarUrl) {
    const loggedInUserName = localStorage.getItem("name")
    const url = baseUrl + `/holidaze/profiles/${loggedInUserName}`

    const requestBody = {
        avatar: {
            url: avatarUrl
        }
    }
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("jwt"),
            'X-Noroff-API-Key': localStorage.getItem("apiKey")
        },
        body: JSON.stringify(requestBody),
    };
    const response = await fetch(url, fetchOptions)
    const responseData = await response.json();
    if (responseData.errors && responseData.errors.length > 0) {
        return responseData.errors.map(error => error.message);
    }
    return []
}