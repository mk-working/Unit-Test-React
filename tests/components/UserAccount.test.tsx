import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
  // Test Case #1
  it("should render the user name ", () => {
    // Emulate the data
    const user: User = { id: 1, name: "MK" };
    // Render the component on the run time
    render(<UserAccount user={user} />);

    //
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  //   Test Case #2
  it("should render edit button if the user isAdmin = true", () => {
    const user: User = { id: 1, name: "MK", isAdmin: true };
    render(<UserAccount user={user} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  // Test Case #3
  it("should not render the edit button if the user isAdmin = false", () => {
    const user: User = { id: 1, name: "MK", isAdmin: false };
    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
