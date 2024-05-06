const baseUrl = 'https://v2.api.noroff.dev';

/**
 * Creates a new booking.
 * @param {Date} dateFrom - The start date of the booking.
 * @param {Date} dateTo - The end date of the booking.
 * @param {number} guests - The number of guests for the booking.
 * @param {string} venueId - The ID of the venue for the booking.
 * @returns {Promise<string[]>} - A promise resolving to an array of error messages if the booking creation fails, otherwise an empty array.
 */
export async function createBooking(dateFrom, dateTo, guests, venueId) {
    const url = baseUrl + '/holidaze/bookings';
    const requestBody = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        guests: guests,
        venueId: venueId
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

/**
 * Deletes a booking.
 * @param {string} bookingId - The ID of the booking to be deleted.
 * @returns {Promise<string[]>} - A promise resolving to an array of error messages if the booking deletion fails, otherwise an empty array.
 */
export async function deleteBooking(bookingId) {
    const url = baseUrl + `/holidaze/bookings/${bookingId}`

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
        return ["Failed to delete booking"];
    }
}