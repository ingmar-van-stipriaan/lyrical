import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import deleteMutation from '../queries/deleteSong';
import { hashHistory } from 'react-router';

class SongList extends Component {
    onSongDelete(id) {
      this.props.mutate({ 
        variables: {
          id: id
        },
        // refetchQueries: [{query: query}]
      }).then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(({ title, id }) => {
            return (
                <li key={id} className='collection-item' onClick={() => { hashHistory.push(`/songs/${id}`) }}>
                    {title}
                    <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            )
        });
    }

    render() {
        if (this.props.data.loading) { return (<div> loading... </div>) }
        
        return (
            <div>
                <ul className='collection'>
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

export default graphql(deleteMutation)(
    graphql(query)(SongList)
);
    