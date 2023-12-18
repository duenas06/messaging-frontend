import React from 'react';
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($input: PostUserInput) {
    postNewUser(input: $input) {
      status
      message
      data {
        id
        userId
        profileUrl
        nickname
        deleted
        createdDate
      }
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation Mutation($input: PostChannelInput) {
    postNewChannel(input: $input) {
      status
      message
      data {
        id
        createdBy
        chatmates
        channelUrl
        createdDate
        deleted
        totalMessages
      }
    }
  }
`;

export default {
  CREATE_USER,
  CREATE_CHANNEL,
};
