describe("empty spec", () => {
  it("logs in", () => {
    cy.visit("localhost:3000");

    cy.get(".border-b-2")
      .clear()
      .type("+12345678901")
      .should("have.value", "+12345678901");

    cy.get("button").click();

    cy.wait(25000);

    cy.get(".border-b-2").type("123456").should("have.value", "123456");

    cy.get("button").click();

    cy.wait(5000);

    cy.get(".ais-SearchBox-input").type("Apple");

    cy.get("p").contains("Apple Inc").click();

    cy.wait(500);

    cy.findByRole("button", { name: /Follow/i }).click();

    cy.get('[data-cy="back-button"]').click();

    cy.wait(1000);

    cy.get('[data-cy="close-explore"]').click();

    cy.wait(5000);

    cy.get('[data-cy="see-all-watch-list"]').click();

    cy.wait(1000);

    cy.get("p").contains("AAPL").should("exist");

    cy.get('[data-cy="back-button"]').click();

    cy.wait(500);

    cy.get('[data-cy="open-search"]').click();

    cy.wait(500);

    cy.get(".ais-SearchBox-input").type("Apple");

    cy.get("p").contains("Apple Inc").click();

    cy.wait(500);

    cy.findByRole("button", { name: /Followed/i }).click();

    cy.get('[data-cy="back-button"]').click();

    cy.wait(500);

    cy.get('[data-cy="see-all-watch-list"]').click();

    cy.wait(500);

    cy.get("p").contains("AAPL").should("not.exist");
  });
});
