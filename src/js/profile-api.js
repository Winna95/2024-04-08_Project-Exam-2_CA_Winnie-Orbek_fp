const baseUrl = 'https://v2.api.noroff.dev';
export async function getMyProfile () {
    const loggedInUserName = localStorage.getItem("name")
    // TODO handle no loggedin username
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

export async function getMyBookings () {
    const loggedInUserName = localStorage.getItem("name")
    // TODO handle no loggedin username
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
export async function getMyVenues () {
    const loggedInUserName = localStorage.getItem("name")
    // TODO handle no loggedin username
    const url = baseUrl + `/holidaze/profiles/${loggedInUserName}/venues`;
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

export async function updateAvatar (avatarUrl) {
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