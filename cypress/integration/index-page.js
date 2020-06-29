/// <reference types="cypress" />

context("Index page", () => {
  beforeEach(() => {
    cy.server();
    cy.route("/api/pokemons").as("getPokemonsFirstPage");
    cy.route("/api/pokemons?offset=10").as("getPokemonsSecondPage");
    cy.visit("/");
  });

  it("paginate the pokemon list", () => {
    cy.wait("@getPokemonsFirstPage");
    cy.get("[data-testid=pokemons-list] li").its("length").should("be", 10);
    cy.get("[data-testid=pokemon-fetch-btn]").focus();
    cy.wait("@getPokemonsSecondPage");
    cy.get("[data-testid=pokemons-list] li").its("length").should("be", 20);
  });

  it("open and close the pokemon dialog", () => {
    cy.wait("@getPokemonsFirstPage");
    cy.get("[data-testid=pokemon-1]").click();
    cy.get("[data-testid=pokemon-dialog]").should("exist");
    cy.get("[data-testid=pokemon-dialog-close-btn]").click();
    cy.get("[data-testid=pokemon-dialog]").should("not.exist");
  });
});
