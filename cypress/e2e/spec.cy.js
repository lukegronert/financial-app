describe("empty spec", () => {
  before(() => {
    cy.exec("npm run seed-db");
  });

  it("logs in", { defaultCommandTimeout: 7000 }, () => {
    console.log("reset worked");
    cy.visit("localhost:3000");

    cy.get(".border-b-2")
      .clear()
      .type("+12345678901")
      .should("have.value", "+12345678901");

    cy.get("button").click();

    cy.get(".border-b-2").type("123456").should("have.value", "123456");

    cy.get("button").click();

    cy.get(".ais-SearchBox-input").type("Apple").as("search");

    cy.get("p").contains("Apple Inc").click();

    cy.findByRole("button", { name: /Follow/i }).click();

    cy.findByRole("button", { name: /Back/i }).click();

    cy.findByRole("button", { name: /Close search/i }).click();

    cy.get('[data-cy="see-all-watch-list"]').click();

    cy.get("p").contains("AAPL").should("exist");

    cy.findByRole("button", { name: /Back/i }).click();

    cy.findByRole("button", { name: /Open search/i }).click();

    cy.get(".ais-SearchBox-input").type("Apple");

    cy.get("p").contains("Apple Inc").click();

    cy.findByRole("button", { name: /Followed/i }).click();

    cy.findByRole("button", { name: /Back/i }).click();

    cy.get('[data-cy="see-all-watch-list"]').click();

    cy.get("p").contains("AAPL").should("not.exist");
  });
});
