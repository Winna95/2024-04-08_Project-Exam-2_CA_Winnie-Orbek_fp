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

