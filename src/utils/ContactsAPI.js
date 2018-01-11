// api definitions
const apiProfile = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5002'
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${apiProfile}/api`, { headers })
    .then(res => res.json())
    .then((data) => {
      return data
    })

export const remove = (contact) =>
  fetch(`${apiProfile}/api/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${apiProfile}/api`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const updateProfile = (body) =>
    fetch(`${apiProfile}/api/updateMember`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => data)

// refactor - test chat
export const updateRegistration = (body, cb) => {
    fetch(`${apiProfile}/chat`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => cb(data))
  }
