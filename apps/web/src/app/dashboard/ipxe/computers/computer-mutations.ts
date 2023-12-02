import { gql } from '$gql';

export const createComputerMutation = gql(`
  mutation CreateComputer($data: ComputerCreateInput!) {
    createComputer(data: $data) {
      uid
      name
      mac
    }
  }
`);

export const addComputerToGroupMutation = gql(`
  mutation AddComputerToGroup($computerUid: String!, $groupUid: String!) {
    addComputersToGroup(computers: [{uid: $computerUid}], where: {uid: $groupUid}) { 
      uid
    }
  }
`);

export const deleteComputerMutation = gql(`
  mutation DeleteComputer($uid: String!) {
    deleteComputers(where: [{uid: $uid}])
  }
`);
