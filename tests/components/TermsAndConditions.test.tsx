import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };

  it("should render with correct text and initial state", () => {
    const { button, checkbox, heading } = renderComponent();
    // Text = Terms & Conditions
    // initial state is false
    render(<TermsAndConditions />);

    expect(heading).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(heading).toHaveTextContent(/Terms & Conditions/i);
    expect(checkbox).not.toBeChecked();
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toBeDisabled();

    screen.debug();
  });

  it("should enable the button when the checkbox is checked", async () => {
    // Arrange
    const { checkbox } = renderComponent();
    render(<TermsAndConditions />);

    // Act
    const user = userEvent.setup();
    await user.click(checkbox);

    // Assert
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
