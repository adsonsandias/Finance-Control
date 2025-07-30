describe('Transactions', () => {
  beforeEach(() => {
    // Mock authentication
    cy.intercept('GET', '/auth/me', {
      statusCode: 200,
      body: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        avatar: null,
      },
    }).as('getUser')

    // Mock transactions list
    cy.intercept('GET', '/transactions*', {
      statusCode: 200,
      body: {
        data: [
          {
            id: '1',
            title: 'Salary',
            amount: 5000,
            type: 'income',
            category: 'Salary',
            date: new Date().toISOString(),
            userId: '1',
          },
          {
            id: '2',
            title: 'Rent',
            amount: 1200,
            type: 'expense',
            category: 'Housing',
            date: new Date().toISOString(),
            userId: '1',
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
        },
      },
    }).as('getTransactions')

    // Visit dashboard page
    cy.visit('/dashboard')
    cy.wait('@getUser')
    cy.wait('@getTransactions')
  })

  it('should display transaction list', () => {
    cy.contains('Salary').should('be.visible')
    cy.contains('Rent').should('be.visible')

    // Check for income amount with correct formatting
    cy.contains('$5,000.00').should('be.visible')

    // Check for expense amount with correct formatting
    cy.contains('$1,200.00').should('be.visible')
  })

  it('should open transaction modal when add button is clicked', () => {
    cy.contains('button', /add|new/i).click()

    cy.get('.react-modal-content').should('be.visible')
    cy.get('.react-modal-content').within(() => {
      cy.get('input[name="title"]').should('exist')
      cy.get('input[name="amount"]').should('exist')
      cy.get('input[name="category"]').should('exist')
    })
  })

  it('should filter transactions', () => {
    // Mock filtered transactions response
    cy.intercept('GET', '/transactions*type=income*', {
      statusCode: 200,
      body: {
        data: [
          {
            id: '1',
            title: 'Salary',
            amount: 5000,
            type: 'income',
            category: 'Salary',
            date: new Date().toISOString(),
            userId: '1',
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      },
    }).as('getFilteredTransactions')

    // Click on income filter
    cy.contains('button', /income/i).click()
    cy.wait('@getFilteredTransactions')

    // Should show only income transactions
    cy.contains('Salary').should('be.visible')
    cy.contains('Rent').should('not.exist')
  })
})
