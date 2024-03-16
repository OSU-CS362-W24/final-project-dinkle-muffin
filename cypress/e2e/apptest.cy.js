describe('Application tests', () => {
  it("Generate a simple line chart", function () {
    cy.visit('/')
    cy.contains('Line').click()
    cy.addTitle('Test')
    cy.addXlabel('V')
    cy.addYlabel('T')
    cy.addvalues("0", "1", "0")
    cy.contains('+').click()
    cy.addvalues("1", "0", "1")
    cy.contains('+').click()
    cy.addvalues("3", "5", "2")
    cy.contains('+').click()
    cy.addvalues("4", "3", "3")
    cy.contains('Generate chart').click()
    cy.get('#chart-display').should('exist')
  })
})