import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component {

  constructor(props) {
    super(props);

  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render () {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={"Enter playlist name"}/>
        <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;