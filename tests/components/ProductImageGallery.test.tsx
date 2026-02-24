import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

// TEST SUITE
describe("ProductImageGallery", () => {
  // Test Case #1
  it("should return the DOM is empty(null) when the imageUrls is not passed or empty array ", () => {
    const result = render(<ProductImageGallery imageUrls={[]} />);

    const container = result.container;
    expect(container).toBeEmptyDOMElement();
  });

  //   Test Case #2
  it("should render a list of images", () => {
    const imageUrls = ["url1", "url2"];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");
    
    // length of array that passed to the component
    expect(images).toHaveLength(2);
    
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
