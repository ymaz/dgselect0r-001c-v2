import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DogViewer } from "../DogViewer";
import { useFetch } from "../../../hooks/useFetch";
import { dataTestIds } from "../../../dataTestIds";

vi.mock("../../../hooks/useFetch");

const mockUseFetch = vi.mocked(useFetch);

const mockDogsData = {
  message: [
    "https://images.dog.ceo/breeds/labrador/n02099712_001.jpg",
    "https://images.dog.ceo/breeds/poodle-standard/n02113799_002.jpg",
  ],
  status: "success",
};

describe("DogViewer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<DogViewer />);

    expect(
      screen.getByTestId(dataTestIds.dogViewer.loading),
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch",
    });

    render(<DogViewer />);

    expect(screen.getByTestId(dataTestIds.dogViewer.error)).toBeInTheDocument();
  });

  it("renders dog images when data is loaded", () => {
    mockUseFetch.mockReturnValue({
      data: mockDogsData,
      loading: false,
      error: null,
    });

    render(<DogViewer />);

    expect(
      screen.getByTestId(dataTestIds.dogViewer.selectedImage),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(dataTestIds.dogViewer.favoriteButton),
    ).toBeInTheDocument();
  });

  it("adds dog to favorites when favorite button is clicked", async () => {
    const user = userEvent.setup();

    mockUseFetch.mockReturnValue({
      data: mockDogsData,
      loading: false,
      error: null,
    });

    render(<DogViewer />);

    const favoriteButton = screen.getByTestId(
      dataTestIds.dogViewer.favoriteButton,
    );
    await user.click(favoriteButton);

    expect(
      screen.getByTestId(dataTestIds.dogViewer.favoritesSection),
    ).toBeInTheDocument();
  });
});
