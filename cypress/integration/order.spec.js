describe("Pizza App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/pizza");
    });
  
    const nameInput = () => cy.get('input[name="name"]');
    const specialInput = () => cy.get('input[name="special"]');
    const orderBtn = () => cy.get('button[id="order-button"]');
    const selectSize = () => cy.get('select[id="size-dropdown"]');
    const selectPepperoni = () => cy.get('input[name="pepperoni"]');
    const selectSausage = () => cy.get('input[name="sausage"]');
    const selectOlives = () => cy.get('input[name="olives"]');
    const selectPineapple = () => cy.get('input[name="pineapple"]');
  
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

    it("can select multiple toppings", () => {
      selectPepperoni()
      .should("have.checked", false)
      .check("pepperoni")
      .should("have.checked", true);
    })
  
    it("can submit a new order", () => {
  
      cy.contains("Connor (Extra Crispy)").should("not.exist");
      nameInput().type("Connor");
      specialInput().type("Extra crispy");
      selectSize().select("small");
      orderBtn().click();
      cy.contains("Connor (Extra crispy)").should("exist");
    });
  });