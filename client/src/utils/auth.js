import decode from 'jwt-decode';

export function isAuthenticated() {
  const token = localStorage.getItem('token');

  if (!token) return false;

  const decoded = decode(token);


  if (decoded.exp > Date.now() / 1000) return decoded.data;
  console.log(decoded.data)

  return false;
}

export function returnDecodedToken(token) {
  const decoded = decode(token)
  return decoded.data
}



// UNDER CONSTRUCTION

export async function generateAccessToken(user) {

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const token = await response.json();
      return token
    }
  }
  catch(error) {
    if(error) {
      console.log(error)
    }
  }


}

export async function registerUser(user) {
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const access_token = await response.json();
  return access_token;
}