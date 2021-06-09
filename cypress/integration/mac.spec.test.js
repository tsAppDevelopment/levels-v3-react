// <reference types="cypress" />

const host = Cypress.env('CYPRESS_BASE_URL');

describe('mac page', () => {
    // remove sw cache to prevent cyypress from testing an old build
    beforeEach(() => {
        if (window.navigator && navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister()
            })
          })
        }
    })

    // eslint-disable-next-line cypress/no-async-tests
    it('loads the page', () => {
        cy.visit(host);
        cy.contains('Atlas')
    })

    it('caculates %mac for c-17a-er with 130k fuel', () => {
        cy.visit(host);

        // get er plane
        cy.get('[data-testid="user air select"]').type('C-17')
        cy.get('.ant-select-item-option').contains(/C-17A-ER$/).click()
        cy.contains(/C-17A-ER$/)
        
        // enter chart c
        cy.get('#weight').type('282000')
        cy.get('#mom').type('26000')
        cy.contains('41.55%')

        // enter 130k fuel
        cy.get('[data-testid="Tank 1 select"]').type('32500{enter}') // test id are dynamic from tank name
        cy.contains('43.97%')

        cy.get('[data-testid="Tank 2 ER select"]').type('32500{enter}')
        cy.contains('40.30%')

        cy.get('[data-testid="Tank 3 ER select"]').type('32500{enter}')
        cy.contains('37.26%')

        cy.get('[data-testid="Tank 4 select"]').type('32500{enter}')

        // final %MAC
        cy.contains('39.44%')
    })

    it('caculates %mac for c-17a with 130k fuel', () => {
        cy.visit(host);

        // get non er plane
        cy.get('[data-testid="user air select"]').type('C-17')
        cy.get('.ant-select-item-option').contains(/C-17A$/).click()
        cy.contains(/C-17A$/)
        
        // enter chart c
        cy.get('#weight').type('282000')
        cy.get('#mom').type('26000')
        cy.contains('41.55%')

        // enter 130k fuel
        cy.get('[data-testid="Tank 1 select"]').type('32500{enter}') // test id are dynamic from tank name
        cy.contains('43.97%')

        cy.get('[data-testid="Tank 2 select"]').type('32500{enter}')
        cy.contains('40.62%')

        cy.get('[data-testid="Tank 3 select"]').type('32500{enter}')
        cy.contains('37.84%')

        cy.get('[data-testid="Tank 4 select"]').type('32500{enter}')

        // final %MAC
        cy.contains('39.98%')
    })

    it('caculates %mac with all the things', () => {
        cy.visit(host);

        // get non er plane
        cy.get('[data-testid="user air select"]').type('C-17')
        cy.get('.ant-select-item-option').contains(/C-17A$/).click()
        cy.contains(/C-17A$/)
        
        // enter chart c
        cy.get('#weight').type('282000')
        cy.get('#mom').type('26000')
        cy.contains('41.55%')

        // enter 130k fuel
        cy.get('[data-testid="Tank 1 select"]').type('32500{enter}') // test id are dynamic from tank name
        cy.contains('43.97%')

        cy.get('[data-testid="Tank 2 select"]').type('32500{enter}')
        cy.contains('40.62%')

        cy.get('[data-testid="Tank 3 select"]').type('32500{enter}')
        cy.contains('37.84%')

        cy.get('[data-testid="Tank 4 select"]').type('32500{enter}')
        cy.contains('39.98%')

        // add c2
        cy.get('[data-testid="user config select"]').type('C-2{enter}')
        cy.contains('38.85%')

        // open modal to modify cargo
        cy.contains('1 EA Hot Cup').click()

        // edit item to be invalid
        cy.get('#name').type('hello') //valid
        cy.get('#weightEA').type('hello') //invalid
        cy.get('#fs').type('hello')//invalid
        cy.get('#qty').type('hello')//invalid

        // close modal
        cy.get('.ant-modal-wrap').click(0,0)

        // should no longer be valid %mac
        cy.contains('%').should('not.exist')

        // delete the hot cup
        cy.contains('1hello EA Hot Cuphello').click()
        cy.get('[data-testid="user cargo delete"]').click()
        cy.contains('1hello EA Hot Cuphello').should('not.exist')

        cy.contains('38.85%')

        // add new cargo
        cy.get('[data-testid="user add new"]').click()

        // open modal to modify cargo
        cy.contains('1 EA custom cargo').click()

        // edit item to be valid
        cy.get('#name').type(' truck')
        cy.get('#weightEA').type('5000')
        cy.get('#fs').type('1200')

        // close modal
        cy.get('.ant-modal-wrap').click(0,0)

      cy.contains('39.95%')

        // add from addenda a
        cy.get('[data-testid="user add adda"]').click()
        cy.contains('SLIP (unoccupied)').click()

        // edit slip
        cy.contains('1 EA SLIP (unoccupied)').click()
        cy.get('#fs').type('{backspace}{backspace}900')

        // close modal
        cy.get('.ant-modal-wrap').click(0,0)

        // final %mac
        cy.contains('39.93%')
    })
})