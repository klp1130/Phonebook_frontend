import axios from "axios"
const baseUrl = '/api/persons'

/// "Resources are fetched from the served with HTTP GET requests. URL notes/3 will return the note that has the id number 3. A get request to the notes URL would return a list of all notes."
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/// "Creating a new resources for storing a note is done by making an HTTP POST request to the notes URL"
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const query = (name) => {
    const request = axios.get(`${baseUrl}/query/${name}`)
    return request.then(response => response.data)
} 

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

/// "The new note is then sent with a PUT request to the backend where it will replace the old object."
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { getAll , create , query, remove , update }