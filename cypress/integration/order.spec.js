describe("Pizza App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    const nameInput = () => cy.get('input[name="name"]');
    const specialInput = () => cy.get('input[name="special"]');
    const orderBtn = () => cy.get('button[id="order-button"]');
  
    it("can type in the inputs", () => {
      nameInput()
        .should("have.value", "")
        .type("Connor")
        .should("have.value", "Connor");
  
      specialInput()
        .should("have.value", "")
        .type("Extra crispy")
        .should("have.value", "Extra crispy");
    });
  
    it("can submit a new order", () => {
  
      cy.contains("Connor (Extra Crispy)").should("not.exist");
      nameInput().type("Connor");
      specialInput().type("Extra crispy");
      orderBtn().click();
      cy.contains("Connor (Extra crispy)").should("exist");
    });
  });