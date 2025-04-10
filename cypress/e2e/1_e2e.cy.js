import { Retro, ticketTypes } from "../lib/retro.lib";
import boardItems from "../fixtures/items.json";
import boardVotes from "../fixtures/votes.json";

describe("Retro", () => {
  beforeEach(() => {
    Retro.visit();

    cy.get('[href="/new"]').click();
    // wait for page to load
    cy.get('[class*="Header__HeaderContainer"]')
      .should("be.visible")
      .wait(1000);
  });

  it.only("Set a board password", () => {
    Retro.setPassword("1234");
    Retro.removePassword("1234");
  });

  it("Complete a retro", () => {
    boardItems.good.forEach((item) => {
      Retro.addTicket(ticketTypes.GOOD, item);
    });

    boardItems.bad.forEach((item) => {
      Retro.addTicket(ticketTypes.BAD, item);
    });

    boardItems.questions.forEach((items) => {
      Retro.addTicket(ticketTypes.QUESTIONS, item);
    });

    Retro.setToVote();

    for (const [key] of Object.entries(boardVotes)) {
      Retro.voteForItems(
        boardVotes[key].itemContent,
        boardVotes[key].numberOfVotes
      );
    }

    Retro.setToActions();

    for (const [key] of Object.entries(boardVotes)) {
      Retro.assertVotes(
        boardVotes[key].itemContent,
        boardVotes[value].numberOfVotes
      );
    }

    // to do
    // add action items
    //// action items are already stored in the items fixture

    // check the action item and assert it is ticked

    // finish the retro and assert the retro is no longer active
  });
});
