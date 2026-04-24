import CommonAPI from "./CommonAPI";
import ServerURL from "./ServerURL";


export const registerAPI = async (reqBody) => {
    return await CommonAPI('POST', `${ServerURL}/register`, reqBody)
}

export const loginAPI = async (reqBody) => {
    return await CommonAPI('POST', `${ServerURL}/login`, reqBody)
}

export const addCarAPI = async (reqBody, reqHeader) => {
    return await CommonAPI('POST', `${ServerURL}/add-car`, reqBody, reqHeader)
}

export const viewAllCarAPI = async (search) => {
    return await CommonAPI('GET', `${ServerURL}/view-car?search=${search}`)
}

export const deleteCarAPI = async (RegNo) => {
    return await CommonAPI('DELETE', `${ServerURL}/delete-car/${RegNo}`)
}

export const updateCarAPI = async (Regno, reqBody, reqHeader) => {
    return await CommonAPI('PUT', `${ServerURL}/update-car/${Regno}`, reqBody, reqHeader)
}

export const getCategoryCarAPI = async (BodyType, reqHeader) => {
    return await CommonAPI('GET', `${ServerURL}/get-car/${BodyType}`, {}, reqHeader)

}

export const addBookingAPI = async (reqBody) => {
    return await CommonAPI('POST', `${ServerURL}/add-booking`, reqBody)
}


export const viewBookingAPI = async (userId) => {
    return await CommonAPI('GET', `${ServerURL}/view-booking/${userId}`)
}

export const deleteHistoryAPI=async(RegNo)=>{
    return await CommonAPI('DELETE',`${ServerURL}/delete-history/${RegNo}`)

}

export const viewAllBookingAPI=async()=>{
    return await CommonAPI('GET',`${ServerURL}/get-all-booking`)
}

export const updateProfileAPI=async(email,reqBody)=>{
    return await CommonAPI('PUT',`${ServerURL}/update-profile/${email}`,reqBody)

}

export const viewBookedDateAPI=async(RegNo)=>{
    return await CommonAPI('GET',`${ServerURL}/view-all-booking/${encodeURIComponent(RegNo)}`)
}

export const viewHomeCarsAPI=async()=>{
    return await CommonAPI('GET',`${ServerURL}/get-car`)
}