import { gql } from '@apollo/client';

import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

const usersQuery = gql`
  query Users {
    users {
      uid
      email
      name
      accountType
    }
  }
`;

export default async function DashboardUsersPage() {
  const { data, error } = await getClient().query({
    query: usersQuery,
  });
  console.log(data, error);
  return <Typography>Dashboard Users Page</Typography>;
}
