describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // create user
    const user = {
      name: "John Doe",
      username: "johndoe",
      password: "john@doe",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is displayed", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome back!");
    cy.contains("Log In");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.visit("http://localhost:3000");
      cy.contains("Welcome back!");
      cy.contains("Log In");
      cy.get("#username").type("johndoe");
      cy.get("#password").type("john@doe");
      cy.get("#login-btn").click();

      cy.contains("John Doe");
      cy.contains("Blogs");
    });

    it("fails with incorrect credentials", function () {
      cy.visit("http://localhost:3000");
      cy.contains("Welcome back!");
      cy.contains("Log In");
      cy.get("#username").type("johndoe");
      cy.get("#password").type("john@doee");
      cy.get("#login-btn").click();

      cy.get("#login-error").should("contain", "Invalid credentials provided.");
      cy.get("#login-error").should("have.css", "color", "rgb(244, 67, 54)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("johndoe");
      cy.get("#password").type("john@doe");
      cy.get("#login-btn").click();
    });

    it("A blog can be created", function () {
      cy.createBlog({
        title: "Test blog created by cypress",
        author: "Cypress User",
        url: "https://www.google.co.in",
      });

      cy.contains("New blog added!");
      cy.contains("Test blog created by cypress");
    });

    describe("When blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test blog created by cypress",
          author: "Cypress User",
          url: "https://www.google.co.in",
        });
      });
      it("A user can like a blog", function () {
        cy.likeBlog({ title: "Test blog created by cypress" });
      });
      it("A user can delete his blog", function () {
        cy.get(".blog-summary").contains("Test blog created by cypress");
        cy.get(".blog-summary").contains("View").click();
        cy.contains("Remove").click();
      });
    });

    describe("When multiple blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test blog created by cypress",
          author: "Cypress User",
          url: "https://www.google.co.in",
        });
        cy.createBlog({
          title: "Test blog 2 created by cypress",
          author: "Cypress User",
          url: "https://www.google.co.in",
        });
        cy.createBlog({
          title: "Test blog 3 created by cypress",
          author: "Cypress User",
          url: "https://www.google.co.in",
        });
        cy.createBlog({
          title: "Test blog 4 created by cypress",
          author: "Cypress User",
          url: "https://www.google.co.in",
        });
      });
      it("Blogs are sorted correctly based on most number of likes", function () {
        cy.likeBlog({ title: "Test blog created by cypress" });
        cy.likeBlog({ title: "Test blog 2 created by cypress" });
        cy.likeBlog({ title: "Test blog created by cypress" });
        cy.likeBlog({ title: "Test blog 4 created by cypress" });
        cy.likeBlog({ title: "Test blog 3 created by cypress" });
        cy.likeBlog({ title: "Test blog created by cypress" });
        cy.get(".blog:first").contains("View").click();
        cy.get(".blog:first").contains("3");
      });
    });
  });
});
