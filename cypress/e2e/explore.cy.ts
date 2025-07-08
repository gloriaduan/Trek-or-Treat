describe("Explore page", () => {
  it("Renders map and markers", () => {
    cy.visit("http://localhost:3000/explore");

    cy.get(".mapboxgl-map", { timeout: 15000 })
      .should("exist")
      .should("be.visible");

    cy.get(".mapboxgl-marker")
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  it("Modal shows on marker click", () => {
    cy.visit("http://localhost:3000/explore");

    cy.get(".mapboxgl-map", { timeout: 15000 })
      .should("exist")
      .should("be.visible");

    cy.get(".mapboxgl-marker").first().click();

    cy.get('[role="dialog"]').should("be.visible");
  });

  it("First location added to start input field, add others to sidebar", () => {
    cy.visit("http://localhost:3000/explore");

    cy.get(".mapboxgl-map", { timeout: 15000 }).should("be.visible");

    // First location (should fill in input)
    cy.get(".mapboxgl-marker").eq(0).click();

    cy.get('[data-testid="marker-address"]').then(($address) => {
      const firstAddress = $address.text();

      cy.get('[data-testid="add-destination-btn"]').click();

      cy.get('[data-testid="start-destination-input"]').should(
        "have.value",
        firstAddress
      );

      cy.get("body").type("{esc}");

      cy.get('[data-testid="destinations-list"]').should(
        "not.contain.text",
        firstAddress
      );

      // Second location
      cy.get(".mapboxgl-marker").eq(0).click();
      cy.get('[data-testid="add-destination-btn"]').click();
      cy.get("body").type("{esc}");

      // Third location
      cy.get(".mapboxgl-marker").eq(2).click();
      cy.get('[data-testid="add-destination-btn"]').click();
      cy.get("body").type("{esc}");

      // Destinations length
      cy.get('[data-testid="destination-item"').should("have.length", 2);
    });
  });

  it("Creates a route when destinations are added", () => {
    cy.visit("http://localhost:3000/explore");
    cy.get(".mapboxgl-map", { timeout: 15000 }).should("be.visible");

    cy.get(".mapboxgl-marker").eq(0).click();
    cy.get('[data-testid="add-destination-btn"]').click();
    cy.get("body").type("{esc}");

    cy.get(".mapboxgl-marker").eq(1).click();
    cy.get('[data-testid="add-destination-btn"]').click();
    cy.get("body").type("{esc}");

    cy.get("button").contains("Get Route").click();

    // Test that route data exists by checking if save button is enabled
    cy.get("button").contains("Save Route").should("not.be.disabled");

    // Check if directions appear
    cy.get(".directions").should("contain.text", "Directions");
    cy.get(".directions ol li").should("have.length.greaterThan", 0);
  });

  // To add transportation mode change tests
});
