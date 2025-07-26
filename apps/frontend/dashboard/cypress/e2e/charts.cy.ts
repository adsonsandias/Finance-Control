describe("Charts and Data Visualization", () => {
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

    // Mock chart data
    cy.intercept("GET", "/transactions/stats*", {
      statusCode: 200,
      body: {
        income: 10000,
        expense: 5000,
        balance: 5000,
        transactions: 15,
        byCategory: [
          { category: "Salary", amount: 8000, type: "income" },
          { category: "Freelance", amount: 2000, type: "income" },
          { category: "Housing", amount: 2000, type: "expense" },
          { category: "Food", amount: 1500, type: "expense" },
          { category: "Transportation", amount: 800, type: "expense" },
          { category: "Entertainment", amount: 700, type: "expense" },
        ],
        byMonth: [
          { month: "Jan", income: 7000, expense: 4000 },
          { month: "Feb", income: 8000, expense: 4500 },
          { month: "Mar", income: 9000, expense: 5000 },
          { month: "Apr", income: 10000, expense: 5000 },
        ],
      },
    }).as("getChartData");

    cy.visit("/analytics");
    cy.wait("@getUser");
    cy.wait("@getChartData");
  });

  it("should display area chart correctly", () => {
    // Check for area chart
    cy.get(".recharts-area").should("exist");
    cy.get(".recharts-area-curve").should("have.length.at.least", 1);

    // Check for axis labels
    cy.get(".recharts-cartesian-axis-tick-value").should("exist");

    // Check for tooltips on hover
    cy.get(".recharts-area-curve").first().trigger("mouseover");
    cy.get(".recharts-tooltip-wrapper").should("be.visible");
  });

  it("should display pie chart correctly", () => {
    // Check for pie chart
    cy.get(".recharts-pie").should("exist");
    cy.get(".recharts-sector").should("have.length.at.least", 4);

    // Check for legend
    cy.get(".recharts-legend-wrapper").should("exist");
    cy.get(".recharts-legend-item").should("have.length.at.least", 4);

    // Check for tooltips on hover
    cy.get(".recharts-sector").first().trigger("mouseover");
    cy.get(".recharts-tooltip-wrapper").should("be.visible");
  });

  it("should allow toggling between chart types", () => {
    // Check for chart type selector
    cy.get("button")
      .contains(/income|expense/i)
      .should("exist");

    // Toggle chart type
    cy.get("button")
      .contains(/expense/i)
      .click();

    // Should update chart data
    cy.get(".recharts-pie").should("exist");
    cy.get(".recharts-sector").should("have.length.at.least", 3);
  });

  it("should allow changing time period", () => {
    // Check for time period selector
    cy.get("select, button")
      .contains(/month|year|week/i)
      .should("exist");

    // Change time period
    cy.get("select").select("year");
    // or if it's buttons
    // cy.get('button').contains('Year').click()

    // Should update chart data
    cy.get(".recharts-area").should("exist");
  });
});
