describe("empty spec", () => {
  before(() => {
    cy.exec("npm run seed-db");
  });

  it("logs in", { defaultCommandTimeout: 7000 }, () => {
    console.log("reset worked");
    cy.visit("localhost:3000");

    cy.findByRole("textbox", { name: /telephone/i })
      .clear()
      .type("+12345678901");

    cy.findByRole("button", { name: /Submit/i }).click();

    cy.findByRole("spinbutton", { name: /one time password/i }).type("123456");

    cy.findByRole("button", { name: /Submit/i }).click();

    cy.findByRole("search").type("Apple");

    cy.findByRole("link", { name: /AAPL/i, exact: false }).click();

    cy.findByRole("button", { name: /Follow/i }).click();

    cy.findByRole("button", { name: /Back/i }).click();

    cy.findByRole("button", { name: /Close search/i }).click();

    cy.findByText("Your Watchlist")
      .parent()
      .findByRole("link", { name: /See all/i })
      .click();

    cy.findByRole("link", { name: /AAPL/i, exact: false }).should("exist");

    cy.findByRole("button", { name: /Back/i }).click();

    cy.findByRole("button", { name: /Open search/i }).click();

    cy.findByRole("search").type("Apple");

    cy.findByRole("link", { name: /AAPL/i, exact: false }).click();

    cy.findByRole("button", { name: /Follow/i, exact: false }).click();

    cy.findByRole("button", { name: /Back/i }).click();

    cy.findByText("Your Watchlist")
      .parent()
      .findByRole("link", { name: /See all/i })
      .click();

    cy.get("p").contains("AAPL").should("not.exist");
  });
});
