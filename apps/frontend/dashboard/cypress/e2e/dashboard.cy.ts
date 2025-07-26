describe("Dashboard", () => {
  beforeEach(() => {
    // Mock user authentication
    cy.intercept("GET", "/auth/me", {
      statusCode: 200,
      body: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        avatar: null,
      },
    }).as("getUser");

    // Mock dashboard data
    cy.intercept("GET", "/transactions/stats*", {
      statusCode: 200,
      body: {
        income: 10000,
        expense: 5000,
        balance: 5000,
        transactions: 15,
      },
    }).as("getStats");

    cy.visit("/dashboard");
    cy.wait("@getUser");
    cy.wait("@getStats");
  });

  it("should display dashboard summary", () => {
    // Check for summary cards
    cy.contains("Income").should("be.visible");
    cy.contains("Expenses").should("be.visible");
    cy.contains("Balance").should("be.visible");

    // Check for values
    cy.contains("$10,000.00").should("be.visible");
    cy.contains("$5,000.00").should("be.visible");
  });

  it("should display charts", () => {
    // Check for charts
    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-surface").should("exist");
  });

  it("should have working navigation", () => {
    // Check for navigation elements
    cy.get("nav").should("exist");
    cy.get("nav a").should("have.length.at.least", 2);

    // Test navigation to transactions
    cy.contains("Transactions").click();
    cy.url().should("include", "/transactions");
  });

  it("should be responsive", () => {
    // Test on mobile viewport
    cy.viewport("iphone-x");
    cy.get(".recharts-responsive-container").should("be.visible");

    // Test on tablet viewport
    cy.viewport("ipad-2");
    cy.get(".recharts-responsive-container").should("be.visible");

    // Test on desktop viewport
    cy.viewport(1280, 720);
    cy.get(".recharts-responsive-container").should("be.visible");
  });
});
