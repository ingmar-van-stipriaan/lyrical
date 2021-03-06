import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "@apollo/client/react/hoc";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        ></input>
      </form>
    );
  }
}
const mutation = gql`
  mutation AddLyricToSong($songId: ID!, $content: String) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
        id
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
