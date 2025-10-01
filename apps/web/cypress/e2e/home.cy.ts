describe('Home', () => {
  it('shows heading', () => {
    cy.visit('/');
    cy.contains('h1', 'Mind Flow');
  });
});



