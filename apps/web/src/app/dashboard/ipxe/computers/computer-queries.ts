import { gql } from '$gql';

export const queryComputersWithoutGroup = gql(`
  query QueryComputersWithoutGroup {
    computers(standalone: true) {
      uid
      name
      mac
      ipv4
      viewOptions {
        order
      }
      strategy {
        __typename
        ...on BasicBootStrategy {
          uid
          name
        }
      }
    }
  }
`);

export const queryComputerGroups = gql(`
  query QueryComputerGroups {
    computerGroups {
      uid
      name
      computers {
        uid
        name
        mac
        ipv4
        viewOptions {
          order
        }
        strategy {
          __typename
          ...on BasicBootStrategy {
            uid
            name
          }
        }
      }
      strategy {
        __typename
        ...on BasicBootStrategy {
          uid
          name
        }
      }
      viewOptions {
        order
      }
    }
  }
`);
