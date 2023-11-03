import http from "../../Pages/http-common"

class ProviderDataServices{
    getFlights(company){
        return http.get(`/provider/dashboard?company=${company}`)
    }
    addFlight(header,body,company){
        // console.log(data)
        return http.post(`/provider/dashboard?company=${company}`,body,header)
    }
    deleteFlight(data,company){
        // console.log(data,company)
        return http.delete(`/provider/dashboard?company=${company}`,data)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProviderDataServices()