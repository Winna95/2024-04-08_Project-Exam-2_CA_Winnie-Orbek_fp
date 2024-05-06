import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {createVenue, updateVenue} from "../../js/venue-api";

const schema = yup
    .object({
        name: yup
            .string()
            .required('Please enter name of the venue'),
        description: yup
            .string()
            .required('Please enter a description of the venue'),
        mediaUrl: yup
            .string()
            .required('please enter a media url'),
        price: yup
            .number()
            .min(1)
            .required('please enter price for the venue'),
        maxGuests: yup
            .number()
            .min(1)
            .required('please enter number of guests'),
        wifi: yup
            .bool().default(false),
        parking: yup
            .bool().default(false),
        breakfast: yup
            .bool().default(false),
        pets: yup
            .bool().default(false),
        address: yup
            .string().default(null),
        city: yup
            .string().default(null),
        zip: yup
            .string().default(null),
        country: yup
            .string().default(null),
        continent: yup
            .string().default(null),
        lat: yup
            .number().default(0),
        lng: yup
            .number().default(0),
    })
    .required();

const Venue = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const isCreateMode = props.createMode
    const venue = props.venue

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema)});

    useEffect(() => {
        if(!isCreateMode) {
            populateForm(venue)
        }
    }, []);

    const populateForm = (venue) => {
        setValue('name', venue.name);
        setValue('description', venue.description);
        setValue('mediaUrl', venue.media[0].url);
        setValue('price', venue.price);
        setValue('maxGuest', venue.maxGuests);
        setValue('wifi', venue.meta.wifi);
        setValue('parking', venue.meta.name);
        setValue('breakfast', venue.meta.breakfast);
        setValue('pets', venue.meta.pets);
        setValue('address', venue.location.address);
        setValue('city', venue.location.city);
        setValue('zip', venue.location.zip);
        setValue('country', venue.location.country);
        setValue('continent', venue.location.continent);
        setValue('lat', venue.location.lat);
        setValue('lng', venue.location.lng);
    };

    async function onSubmit(data) {
        const errors = isCreateMode ?
            await createVenue(data.name, data.description, data.mediaUrl, data.price, data.maxGuests, data.wifi, data.parking, data.breakfast, data.pets, data.address, data.city, data.zip, data.country, data.continent, data.lat, data.lng)
            :
            await updateVenue(data.name, data.description, data.mediaUrl, data.price, data.maxGuests, data.wifi, data.parking, data.breakfast, data.pets, data.address, data.city, data.zip, data.country, data.continent, data.lat, data.lng, venue.id)
        ;
        if(errors.length < 1) {
            window.location.reload()
        } else {
            setErrorMessage("Failed to save venue, due to: " + errors.join(", "))
        }

    }

    return (
        <div>
            <div className="container">
                <form className="row mt-4 fw-medium" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-10 col-md-8 col-lg-6 mx-auto px-4 py-5 mt-n2 mb-5 form-bg rounded-0 shadow">
                        <h5 className="text-center fw-bolder">{isCreateMode ? "Create venue" : "Update venue"}</h5>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="name" className="form-label mb-2 fw-normal">Venue name:</label>
                            <input {...register('name')} className="form-control rounded-0 shadow"/>
                            <p>{errors.name?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="description" className="form-label mb-2 fw-normal">Description:</label>
                            <input {...register('description')} className="form-control rounded-0 shadow"/>
                            <p>{errors.description?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="mediaUrl" className="form-label mb-2 fw-normal">MediaUrl:</label>
                            <input {...register('mediaUrl')} className="form-control rounded-0 shadow"/>
                            <p>{errors.mediaUrl?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="price" className="form-label mb-2 fw-normal">Price:</label>
                            <input {...register('price')} defaultValue={1} className="form-control rounded-0 shadow"/>
                            <p>{errors.price?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="maxGuests" className="form-label mb-2 fw-normal">Max Guest:</label>
                            <input {...register('maxGuests')} defaultValue={1} className="form-control rounded-0 shadow"/>
                            <p>{errors.maxGuests?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="wifi" className="form-label mb-2 fw-normal">Wifi included:</label>
                            <input type={"checkbox"} {...register('wifi')} defaultChecked={false}
                                   className="form-check-input"/>
                            <p>{errors.wifi?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="parking" className="form-label mb-2 fw-normal">Parking included:</label>
                            <input type={"checkbox"} {...register('parking')} defaultChecked={false}
                                   className="form-check-input"/>
                            <p>{errors.parking?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="breakfast" className="form-label mb-2 fw-normal">Breakfast included:</label>
                            <input type={"checkbox"} {...register('breakfast')} defaultChecked={false}
                                   className="form-check-input"/>
                            <p>{errors.breakfast?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="pets" className="form-label mb-2 fw-normal">Pets allowed:</label>
                            <input type={"checkbox"} {...register('pets')} defaultChecked={false}
                                   className="form-check-input"/>
                            <p>{errors.pets?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="address" className="form-label mb-2 fw-normal">Address:</label>
                            <input {...register('address')} className="form-control rounded-0 shadow"/>
                            <p>{errors.address?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="city" className="form-label mb-2 fw-normal">City:</label>
                            <input {...register('city')} className="form-control rounded-0 shadow"/>
                            <p>{errors.city?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="zip" className="form-label mb-2 fw-normal">Zip:</label>
                            <input {...register('zip')} className="form-control rounded-0 shadow"/>
                            <p>{errors.zip?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="country" className="form-label mb-2 fw-normal">Country:</label>
                            <input {...register('country')} className="form-control rounded-0 shadow"/>
                            <p>{errors.country?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="continent" className="form-label mb-2 fw-normal">Continent:</label>
                            <input {...register('continent')} className="form-control rounded-0 shadow"/>
                            <p>{errors.continent?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="lat" className="form-label mb-2 fw-normal">Latitude:</label>
                            <input {...register('lat')} defaultValue={0} className="form-control rounded-0 shadow"/>
                            <p>{errors.lat?.message}</p>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label htmlFor="lng" className="form-label mb-2 fw-normal">Longitude:</label>
                            <input {...register('lng')} defaultValue={0} className="form-control rounded-0 shadow"/>
                            <p>{errors.lng?.message}</p>
                        </div>
                        {!!errorMessage ? errorMessage : <div/>}
                        <div className="text-center">
                            <button type="submit" className="btn-blue border-0 fw-medium text-white px-5 py-2 rounded-0">Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Venue;