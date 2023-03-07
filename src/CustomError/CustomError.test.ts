import { CustomError } from "./CustomError";

describe("Given a CustomError class", () => {
  describe("When it is instantiated with the message 'Page not found', the statusCode 404 and the publicMessage 'Couldn't find the requested page'", () => {
    test("Then it should have the property message and show the message 'Page not found'", () => {
      const message = "Page not found";

      const expectedError = new CustomError(message, 0, "");

      expect(expectedError).toHaveProperty("message", message);
    });

    test("Then it should have the property statusCode and show the status code 404", () => {
      const statusCode = 404;

      const expectedError = new CustomError("", statusCode, "");

      expect(expectedError).toHaveProperty("statusCode", statusCode);
    });

    test("Then it should have the property publicMessage and show the public message 'Couldn't find the requested page'", () => {
      const publicMessage = "Couldn't find the requested page";

      const expectedError = new CustomError("", 0, publicMessage);

      expect(expectedError).toHaveProperty("publicMessage", publicMessage);
    });
  });
});
