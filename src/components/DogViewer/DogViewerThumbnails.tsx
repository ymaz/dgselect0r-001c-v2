import type { DogsDataRemapped } from "./DogViewer";

export const DogViewerThumbnails = ({
  data = [],
  selectedDog,
  onSelect,
  addToFavorite,
}: {
  data: DogsDataRemapped[];
  selectedDog: string | null;
  onSelect: (dogImgUrl: string) => void;
  addToFavorite: (dogImgUrl: string) => void;
}) => {
  return (
    <ul className="dog-viewer-thumbnail-list">
      {data.map(({ dogImgUrl, breedValue }) => (
        <li
          key={dogImgUrl}
          className={`dog-viewer-thumbnail-item ${selectedDog === dogImgUrl ? "selected" : ""}`}
          // tabIndex={0}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" || e.key === " ") {
          //     e.preventDefault();
          //     handleDogClick(dogImgUrl);
          //   }
          // }}
        >
          <button
            type="button"
            className="dog-viewer-thumbnail-button"
            aria-label={`select dog breed ${breedValue}`}
            onClick={() => onSelect(dogImgUrl)}
          >
            <img
              className="dog-viewer-thumbnail-img"
              src={dogImgUrl}
              alt={`dog image ${breedValue}`}
            />
          </button>
          <p className="dog-viewer-thumbnail-breed-value">{breedValue}</p>
          <button type="button" onClick={() => addToFavorite(dogImgUrl)}>
            Favorite
          </button>
        </li>
      ))}
    </ul>
  );
};
