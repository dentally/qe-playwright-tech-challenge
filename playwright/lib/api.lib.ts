import { Page } from '@playwright/test';

interface ApiBody {
  operationName: string;
  variables: {
    slug: string;
    title: string;
  };
  query: string;
}

class _Api {
  constructor(private page: Page) {}

  async getUuid(): Promise<string> {
    // get the uuid ready for the network request
    const url = this.page.url();
    const uuid = url.split('/').pop() || '';
    return uuid;
  }

  apiBody(uuid: string): ApiBody {
    return {
      operationName: 'createWorksItem',
      variables: {
        slug: uuid,
        title: 'hey I sent this via a POST request!',
      },
      query:
        'mutation createWorksItem($slug: String!, $title: String!) {\n  createWorksItem(retroSlug: $slug, title: $title) {\n    id\n    hidden\n    title\n    userUuid\n    votes\n    __typename\n  }\n}\n',
    };
  }

  async createItem() {
    const uuid = await this.getUuid();
    const body = this.apiBody(uuid);

    // put your API request here
  }
}

export const createApi = (page: Page) => new _Api(page);
