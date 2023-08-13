/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const emailById = 'input[id="login_email"]';
const passwordById = 'input[id="login_password"]';
const submitById = 'button[type="submit"]';
describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login form", () => {
    cy.contains("Sign in");
    cy.get(emailById).should("exist");
    cy.get(passwordById).should("exist");
    cy.get(submitById).should("exist");
    cy.contains(
      "By continuing, you agree to the ImpactHub terms of service and privacy notice."
    );
  });

  it("should redirect to sign up form", () => {
    // Check if the "Sign up" link exists
    cy.contains("Dont have an account?").should("exist");
    cy.contains("Sign up").should("exist");

    // Check if the "Sign up" link exists by its CSS selector
    cy.get('a[href="/signup"]').should("exist");

    // Click the "Sign up" link
    cy.get('a[href="/signup"]').click();
    // Assert that the URL changes to the sign-up page
    cy.url().should("include", "/signup");
  });

  it("should redirect to Forgot Password form", () => {
    cy.contains("Forgot your password?").should("exist");

    // Check if the "Sign up" link exists by its CSS selector
    cy.get('a[href="/forgotPassword"]').should("exist");

    // Click the "Sign up" link
    cy.get('a[href="/forgotPassword"]').click();
    // Assert that the URL changes to the sign-up page
    cy.url().should("include", "/forgotPassword");
  });

  it.only("should log in with valid credentials", () => {
    cy.fixture("users.json").then((users) => {
      cy.get(emailById).type(users[0].email);
      cy.get(passwordById).type(users[0].password);
      cy.get(submitById).click();

      // Adjust the URL or text as needed
      cy.url().should("eq", "http://localhost:3000/");
      cy.get(".ant-message").should("contain", "Login Successfull!");
    });
  });

  it("should display an error with invalid credentials", () => {
    cy.fixture("users.json").then((users) => {
      cy.get(emailById).type(users[0].email);
      cy.get(passwordById).type("invalidpassword");
      cy.get(submitById).click();

      // Adjust the error message or selector as needed
      cy.get(".ant-message").should("contain", "invalid credentials");
    });
  });
});
