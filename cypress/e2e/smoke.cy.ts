
// describe("smoke tests", () => {
//   afterEach(() => {
//     cy.cleanupUser();
//   });

//   it("should allow you to register and login", () => {
//     const loginForm = {
//       email: `${faker.internet.userName()}@example.com`,
//       password: faker.internet.password(),
//     };
//     cy.then(() => ({ email: loginForm.email })).as("user");

//     cy.visit("/");
//     cy.findByRole("link", { name: /sign up/i }).click();

//     cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
//     cy.findByLabelText(/password/i).type(loginForm.password);
//     cy.findByRole("button", { name: /create account/i }).click();
//     cy.findByRole("button", { name: /logout/i }).click();
//     cy.findByRole("link", { name: /log in/i });
//   });

//   it("should allow you add item with alert", () => {
//     cy.login();
//     cy.visit("/");

//     cy.findByRole("link", { name: /items/i }).click();

//     cy.findAllByRole("button", { name: /add to cart/i }).first().click();
//     cy.on("window:alert", (text) => {
//       expect(text).to.equal(
//         `Added Frozen Mango to cart`
//       );
//     })
//   });
// });
