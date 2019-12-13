import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchResults: [],
                  playlistName: 'My Playlist',
                  playlistTracks: [],
                  hasAuthorization: ''
                };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getAuthorization = this.getAuthorization.bind(this);

  };

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  getAuthorization() {

    let accessToken = Spotify.getAccessToken();

    this.setState({hasAuthorization: accessToken})


  }

  // Generate an array of uri values called trackURIs from the playlistTracks property.
  savePlaylist() {

    const trackUris = this.state.playlistTracks.map(track => {
      return track.uri;
    })

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });

  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else{
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    };
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  };



  render() {
    return (
  <div>
  <h1><a href='https://www.vladcancode.com'>vladcancode.com</a></h1>
  <div className="App">
    <SearchBar getAuthorization={this.getAuthorization} hasAuthorization={this.state.hasAuthorization} onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
      <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
  </div>);
  }
}

export default App;
