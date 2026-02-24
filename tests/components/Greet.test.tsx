import Greet from "../../src/components/Greet";
import { render, screen } from "@testing-library/react";

// TEST SUITE
describe("Greet", () => {
  // First Test Case
  it("should render the name with hello when the name is provided", () => {
    render(<Greet name="MK" />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/mk/i);
    screen.debug();
  });

  //Second Test Case
  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
