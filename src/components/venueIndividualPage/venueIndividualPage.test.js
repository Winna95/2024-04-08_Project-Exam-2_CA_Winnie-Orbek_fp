import {resolveUnselectableDatesForVenue} from "./venueIndividualPage";
function composeBooking (dateFrom, dateTo, guests) {
return {
    dateFrom : dateFrom,
    dateTo: dateTo,
    guests: guests
}
}
describe("an individual venue page", () => {
    test("two bookings with different date ranges and for less than the max count guest, should not cause any dates to be unselectable ", () => {
        const maxGuest = 10
        const bookings = [
            composeBooking(
                new Date(2023,4, 1, 12, 0, 0, 0),
                new Date(2023,4, 10, 12, 0, 0, 0),
                9
            ),
            composeBooking(
                new Date(2023,5, 11, 12, 0, 0, 0),
                new Date(2023,5, 12, 12, 0, 0, 0),
                9
            )
        ]

        const unselectableDates = resolveUnselectableDatesForVenue(bookings, maxGuest)

        expect(unselectableDates.length).toBe(0)
    })

    test("two bookings with different date ranges and for more than the max count guest, should cause all dates to be unselectable ", () => {
        const maxGuest = 10
        const bookings = [
            composeBooking(
                new Date(2023,4, 1, 12, 0, 0, 0),
                new Date(2023,4, 10, 12, 0, 0, 0),
                10
            ),
            composeBooking(
                new Date(2023,5, 11, 12, 0, 0, 0),
                new Date(2023,5, 12, 12, 0, 0, 0),
                11
            )
        ]

        const unselectableDates = resolveUnselectableDatesForVenue(bookings, maxGuest)

        expect(unselectableDates.length).toBe(12)
    })
    test("two bookings with partially overlapping date ranges  where each booking does not exceeds the max guest count, but together they do, should cause the intersected dates to be unselectable ", () => {
        const maxGuest = 10
        const bookings = [
            composeBooking(
                new Date(2023,4, 1, 12, 0, 0, 0),
                new Date(2023,4, 10, 12, 0, 0, 0),
                4
            ),
            composeBooking(
                new Date(2023,4, 5, 12, 0, 0, 0),
                new Date(2023,4, 12, 12, 0, 0, 0),
                6
            )
        ]

        const unselectableDates = resolveUnselectableDatesForVenue(bookings, maxGuest)
        const unselectableDatesAsMs = unselectableDates.map(unselectableDate => unselectableDate.getTime())
        expect(unselectableDates.length).toBe(6)
        expect(unselectableDatesAsMs.includes(new Date(2023,4, 5, 12, 0, 0, 0).getTime())).toBeTruthy()
        expect(unselectableDatesAsMs.includes(new Date(2023,4, 6, 12, 0, 0, 0).getTime())).toBeTruthy()
        expect(unselectableDatesAsMs.includes(new Date(2023,4, 7, 12, 0, 0, 0).getTime())).toBeTruthy()
        expect(unselectableDatesAsMs.includes(new Date(2023,4, 8, 12, 0, 0, 0).getTime())).toBeTruthy()
        expect(unselectableDatesAsMs.includes(new Date(2023,4, 9, 12, 0, 0, 0).getTime())).toBeTruthy()
        expect(unselectableDatesAsMs.includes(new Date(2023,4, 10, 12, 0, 0, 0).getTime())).toBeTruthy()

    })

})