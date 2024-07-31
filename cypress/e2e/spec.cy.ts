describe("Homepage", () => {
  beforeEach(() => {});

  it("should display the correct Pokemon", () => {
    cy.visit("/");

    cy.get('input[placeholder="Pokemon name"]').should("exist");

    cy.get('input[placeholder="Pokemon name"]').type("pikachu");

    cy.contains("Go to CSR").should("exist");

    cy.contains("Go to CSR").click();

    cy.contains("pikachu").should("exist");
  });
});
