const baseUrl = 'https://v2.api.noroff.dev';
export async function createBooking(dateFrom, dateTo, guests, venueId) {
    const url = baseUrl + '/holidaze/bookings';
    const requestBody = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        guests: guests,
        venueId:  venueId
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
        return responseData.errors;
    }

    return [];
}