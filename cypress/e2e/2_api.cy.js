import { Api } from "../lib/api.lib";
import { Retro } from "../lib/retro.lib";

describe("API Testing", () => {
  beforeEach(() => {
    Retro.visit();

    cy.get('[href="/new"]').click();
    // wait for page to load
    cy.get('[class*="Header__HeaderContainer"]')
      .should("be.visible")
      .wait(1000);
  });

  it("Create an board item using the API", () => {
    Api.createItem();

    // assert item has been added
    cy.contains("div", "hey I sent this via a POST request!").should(
      "be.visible"
    );
  });
});
