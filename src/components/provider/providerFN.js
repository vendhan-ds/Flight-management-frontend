import http from "../../Pages/http-common"

class ProviderDataServices{
    getFlights(company){
        return http.get(`/provider/dashboard?company=${company}`)
    }
    addFlight(data,company){
        return http.post(`/provider/dashboard?company=${company}`,data)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProviderDataServices()