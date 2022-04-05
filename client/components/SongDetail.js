import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    
    if (!song) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <Link to="/" className="btn red">Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate/>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { 
      variables: { 
        id: props.params.id 
      } 
    }
  }
})(SongDetail);