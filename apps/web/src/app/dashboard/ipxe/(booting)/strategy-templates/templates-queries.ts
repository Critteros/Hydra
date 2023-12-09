import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type IpxeTemplate = ArrayElement<
  DocumentType<typeof IpxeTemplatesQuery>['ipxeStrategyTemplates']
>;

export const IpxeTemplatesQuery = gql(`
  query IpxeTemplatesQuery {
    ipxeStrategyTemplates {
      id
      name
      description
    }
  }
`);
