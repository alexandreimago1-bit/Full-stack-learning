import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const deletePerson = (_id) => {
    const request = axios.delete(`${baseURL}/${_id}`)
    return request.then(response => response.data)
}
const update = (_id, newObject) => {
    const request =  axios.put(`${baseURL}/${_id}`, newObject)
    return request.then(response => response.data)
}
export default { getAll, deletePerson, create, update }