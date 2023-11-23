import { gql } from '@apollo/client';

export const QUERY_GETSINGLEUSER = gql`
  {
    getSingleUser {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;