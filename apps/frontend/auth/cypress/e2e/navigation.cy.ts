describe('Navigation and Layout', () => {
  beforeEach(() => {
    // Mock user authentication to test protected routes
    cy.intercept('GET', '/auth/me', {
      statusCode: 200,
      body: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        avatar: null,
      },
    }).as('getUser')

    cy.visit('/')
  })

  it('should have working header navigation', () => {
    // Wait for auth check to complete
    cy.wait('@getUser')

    // Check header elements
    cy.get('header').should('exist')
    cy.get('header').find('a').should('have.length.at.least', 1)
  })

  it('should navigate to dashboard when authenticated', () => {
    cy.wait('@getUser')

    // Find and click dashboard link
    cy.contains('Dashboard').click()
    cy.url().should('include', '/dashboard')
  })

  it('should have a responsive layout', () => {
    // Test on mobile viewport
    cy.viewport('iphone-x')
    cy.get('header').should('be.visible')

    // Test on tablet viewport
    cy.viewport('ipad-2')
    cy.get('header').should('be.visible')

    // Test on desktop viewport
    cy.viewport(1280, 720)
    cy.get('header').should('be.visible')
  })
})
