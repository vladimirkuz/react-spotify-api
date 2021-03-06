import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {term:''};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  //search artist
  search() {
    this.props.onSearch(this.state.term);
  }

  renderAction() {

    if (this.props.hasAuthorization){
      return (
          <div className="SearchBar">
              <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
              <button onClick={this.search} className="SearchButton">SEARCH</button>
          </div>)
    }else{
      return (
        <div className="SearchBar">
          <button onClick={this.props.getAuthorization} className="SearchButton">ACCESS SPOTIFY</button>
        </div>
      )
    }
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  render() {
    return (


        this.renderAction()

    )
  }
}

export default SearchBar;
