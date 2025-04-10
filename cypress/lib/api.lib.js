class _Api {
  getUuid() {
    // get the uuid ready for the network request
    cy.url().then((url) => {
      const uuid = url.split("/").pop();
      cy.wrap(uuid).as("uuid");
    });
  }

  apiBody(uuid) {
    return {
      operationName: "createWorksItem",
      variables: {
        slug: uuid,
        title: "hey I sent this via a POST request!",
      },
      query:
        "mutation createWorksItem($slug: String!, $title: String!) {\n  createWorksItem(retroSlug: $slug, title: $title) {\n    id\n    hidden\n    title\n    userUuid\n    votes\n    __typename\n  }\n}\n",
    };
  }

  createItem() {
    //
  }
}

export const Api = new _Api();
