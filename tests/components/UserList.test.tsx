import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

// TEST SUITE
describe("UserList", () => {
  // TEST CASE #1
  it('should display no "No users" when the users array is empty', () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  //   TEST CASE #2
  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "MK", isAdmin: true },
      { id: 2, name: "Mosh", isAdmin: true },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
