class _Retro {
  visit() {
    cy.visit("https://www.retrotool.app");
    cy.get("h1").should("contain.text", "Retro tool");
  }

  addTicket(ticketType, content) {
    cy.get(`[placeholder="${ticketType}"]`).type(`${content} {enter}`);
  }

  setToVote() {
    cy.contains("button", "Group & vote comments").click();
    cy.contains(
      '[data-reach-dialog-overlay="true"] button',
      "Group & vote comments"
    ).check();
    cy.contains("button", "Discuss and add action items").should("be.visible");
  }

  voteForItems(item, count) {
    cy.contains("div", item)
      .parents('[draggable="false"]')
      .within(() => {
        for (let clicks = 0; clicks < count; clicks++) {
          cy.intercept("POST", "https://www.retrotool.app/api/graph").as(
            "traffic"
          );
          cy.get('[role="button"]').dblclick();
          cy.wait("@traffic")
            .its("response.statusCode")
            .should("eq", 200)
            .wait(500);
        }
      });
  }

  assertVotes(item, count) {
    cy.contains("div", item)
      .parents('[class*="BaseItem__BaseItemContainer"]')
      .within(() => {
        cy.contains('[color="grey"]', count).should("be.visible");
      });
  }

  setToActions() {
    cy.contains("button", "Discuss and add action items").click();
  }

  setPassword(password) {
    cy.contains("svg", "Retro not protected by password").click();
    cy.get('[type="password"]').type(`${password}`);
    cy.contains("button", "Set").click();
  }

  removePassword(password) {
    cy.contains("svg", "Retro protected by password").click();
    cy.get('[type="password"]').type(`${password}`);
    cy.contains("button", "Remove").click();
    cy.contains("svg", "Retro not protected by password").should("be.visible");
  }
}

export const ticketTypes = {
  GOOD: "It worked well that...",
  BAD: "We could improve...",
  QUESTIONS: "I want to ask about...",
  ACTIONS: "We need to do...",
};

export const Retro = new _Retro();
