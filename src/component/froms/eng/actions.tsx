"use server"
import axios from "axios"

export default async function GetFormEng(): Promise<any> {
    let headers: any = { "Content-Type": "application/json", "Accept-Language": "ar-SA" }
    let API = process.env.NEXT_PUBLIC_API
    // -------
    // let RealEstatType = await axios.get(`${API}/Lookup/RealEstatType`, { headers })
    //     .then(({ data }) => data?.data)

    // let RealEstatAges = await axios.get(`${API}/Lookup/RealEstatAges`, { headers })
    //     .then(({ data }) => data?.data)

    // let ProjectObjectives = await axios.get(`${API}/Lookup/ProjectObjectives`, { headers })
    //     .then(({ data }) => data?.data)

    // let WorkAreas = await axios.get(`${API}/Lookup/WorkAreas`, { headers })
    //     .then(({ data }) => data?.data)

    // -----   
    let Cities = await axios.get(`${API}/Lookup/Cities`, { headers }).then(({ data }) => data?.data)

    let Qualifications = await axios.get(`${API}/Lookup/Qualifications`, { headers }).then(({ data }) => data?.data)

    return {
        Cities, Qualifications // RealEstatType, ProjectObjectives, WorkAreas

    }
} 