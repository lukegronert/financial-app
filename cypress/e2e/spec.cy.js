describe("empty spec", () => {
  it("logs in", () => {
    cy.visit("localhost:3000");

    cy.get(".border-b-2")
      .clear()
      .type("+12345678901")
      .should("have.value", "+12345678901");

    cy.get("button").click();

    cy.wait(15000);

    cy.get(".border-b-2").type("123456").should("have.value", "123456");

    cy.get("button").click();

    cy.wait(5000);

    cy.wait(5000);
  });
});
