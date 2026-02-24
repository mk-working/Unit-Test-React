import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  // Test Case #1
  it("should render the full text if less than 255 characters", () => {
    const shortText = "Short Text";
    render(<ExpandableText text={shortText} />);

    // Look up on the DOM
    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  // Test Case #2
  it("should truncate text if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  // Test Case #3
  it("should expand text when Show More button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  //   Test case #4
  it("should collapse the text when the show less is clicked", async () => {
    // Arrange
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    // Act
    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
