import React from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {searchResults: [{name: 'song', artist: 'vlad', album: 'album', id: 1}, {name: 'song', artist: 'vlad', album: 'album', id: 2}, {name: 'song', artist: 'vlad', album: 'album', id: 3}],
                  playlistName: 'My Playlist',
                  playlistTracks: [{name: 'song', artist: 'vlad', album: 'album', id: 1}, {name: 'song', artist: 'vlad', album: 'album', id: 2}, {name: 'song', artist: 'vlad', album: 'album', id: 3}]
                };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  };

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
  <h1>vladcancode.com</h1>
  <div class="App">
    <SearchBar />
    <div class="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
      <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
  </div>);
  }
}

export default App;
