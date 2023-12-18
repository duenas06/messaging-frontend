import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUserById($input: GetUserByIdInput) {
    getUserById(input: $input) {
      status
      message
      data {
        id
        userId
        profileUrl
        nickname
      }
    }
  }
`;

export const GET_CHANNEL = gql`
  query GetChannelById($input: GetChannelByIdInput) {
    getChannelById(input: $input) {
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
  GET_USER,
  GET_CHANNEL,
};
