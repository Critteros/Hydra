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

export const createComputerGroupMutation = gql(`
  mutation CreateComputerGroup($data: ComputerGroupCreateInput!) {
    createComputerGroup(data: $data) {
      uid
      name
    }
  }
`);

export const deleteComputerGroupMututation = gql(`
  mutation DeleteComputerGroup($uid: String!) {
    deleteComputerGroups(where: [{uid: $uid}])    
  }
`);

export const moveComputerAndUpdateOrderMutation = gql(`
  mutation MoveComputerToGroupAndUpdateOrder($computerUid: String!, $groupUid: String, $order: Int!) {
    moveComputerAndUpdateOrder(whichComputer: {uid: $computerUid}, computerGroupUid: $groupUid, newOrder: $order)
  }
`);
