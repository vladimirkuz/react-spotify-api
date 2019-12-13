
// The implicit grant flow returns a user’s access token in the URL.
let accessToken = '';
const clientId = 'b89bb1d56c744e82973c507abc904d5c';
const redirectURI = 'http://localhost:3000/';

const Spotify = {

  // search tracks
  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed - return to vladcancode.com');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {

      if (!jsonResponse.tracks) {
        return [];
      }

      //track object
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      })
    })
  },


  //Get a Spotify user’s access token
  getAccessToken() {

    // Condition 1: access token already exists
    if (accessToken) {
      return accessToken;
    }

    //save parameters in URL
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // Condition 2: access token is in URL
    if (accessTokenMatch && expiresInMatch) {

      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Clear parameters
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
   } else {
       //Condition 3: Have application request authorization
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

    }


  },

  savePlaylist(playlistName, trackURIs) {

    if ((!playlistName || !trackURIs.length)) {
      return;
    }

    const accessToken = Spotify.getAccessToken();

    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;


    return fetch(`https://api.spotify.com/v1/me`,{headers: headers}
    ).then(response => {
      if (response.ok){
        return response.json()
      }
      throw new Error('UserID request failed!')
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify({name:playlistName})
        }).then(response => {
          if (response.ok){
            return response.json()
          }
          throw new Error('PlaylistID request failed!')
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
            headers: {Authorization: `Bearer ${accessToken}`, Accept: 'application/json'},
            method: 'POST',
            body: JSON.stringify({"uris":trackURIs})
          });

        });

    });

  }


}

export default Spotify;
