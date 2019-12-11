
// The implicit grant flow returns a user’s access token in the URL.
let accessToken = '';
const clientId = 'b89bb1d56c744e82973c507abc904d5c';
const redirectURI = 'https://www.vladcancode.com';

const Spotify = {

  //Get a Spotify user’s access token
  getAccessToken() {

    // Condition 1: access toekn exists
    if (accessToken){
      return accessToken;
    }

    /* return fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize`,
    {client_id: clientId,
    response_type: 'token',
    redirect_uri: 'https://www.vladcancode.com/Completed/Spotify/index.html'}).then(response => { */

    //save parameters in URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // Condition 2: access token is in URL
    if (accessTokenMatch && expiresInMatch) {
      let accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Clears parameters
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      // Condition 3: Have application request authorization
      window.location(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
    }

    return accessToken;
  };

}

export default Spotify;
