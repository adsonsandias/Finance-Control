describe('Form Components', () => {
  beforeEach(() => {
    cy.visit('/signup') // Using signup page as it has most form elements
  })

  it('should render input fields correctly', () => {
    // Check for name input
    cy.get('input[name="name"]').should('exist').and('have.attr', 'placeholder')

    // Check for email input
    cy.get('input[name="email"]').should('exist').and('have.attr', 'type', 'email')

    // Check for password input
    cy.get('input[name="password"]').should('exist').and('have.attr', 'type', 'password')
  })

  it('should validate input fields', () => {
    // Submit empty form
    cy.get('button[type="submit"]').click()

    // Check for validation messages
    cy.contains('required').should('be.visible')

    // Fill with invalid email
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('button[type="submit"]').click()

    // Should show email validation error
    cy.contains('valid email').should('be.visible')

    // Fill with short password
    cy.get('input[name="password"]').type('123')
    cy.get('button[type="submit"]').click()

    // Should show password validation error
    cy.contains('password').should('be.visible')
  })

  it('should have working form buttons', () => {
    // Check submit button
    cy.get('button[type="submit"]').should('exist').and('not.be.disabled')

    // Check if there's a cancel/back button and it works
    cy.contains('button', /back|cancel/i)
      .should('exist')
      .click()

    // Should navigate away from signup
    cy.url().should('not.include', '/signup')
  })
})
