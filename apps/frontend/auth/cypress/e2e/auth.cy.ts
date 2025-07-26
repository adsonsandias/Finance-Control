describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the login page', () => {
    cy.get('h1').should('contain', 'Login')
    cy.get('form').should('exist')
  })

  it('should show validation errors with empty form submission', () => {
    cy.get('button[type="submit"]').click()
    cy.get('form').should('contain', 'required')
  })

  it('should navigate to signup page', () => {
    cy.contains('Create an account').click()
    cy.url().should('include', '/signup')
    cy.get('h1').should('contain', 'Create account')
  })

  // This test would require mocking the API response
  it('should show error with invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Wait for error message to appear
    cy.contains('Invalid credentials', { timeout: 5000 }).should('be.visible')
  })
})
