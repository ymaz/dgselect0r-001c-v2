import type { DogsDataRemapped } from "./DogViewer";

export const DogViewerThumbnails = ({
  data = [],
  selectedDog,
  onSelect,
}: {
  data: DogsDataRemapped[];
  selectedDog: string | null;
  onSelect: (dogImgUrl: string) => void;
}) => {
  return (
    <ul className="dog-viewer-thumbnail-list">
      {data.map(({ dogImgUrl, breedValue }) => (
        <li key={dogImgUrl}>
          <button
            type="button"
            className={`dog-viewer-thumbnail-button ${selectedDog === dogImgUrl ? "selected" : ""}`}
            aria-label={`Select dog ${breedValue}`}
            title={`Select dog ${breedValue}`}
            onClick={() => onSelect(dogImgUrl)}
          >
            <img
              className="dog-viewer-thumbnail-img"
              src={dogImgUrl}
              alt={`dog image ${breedValue}`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};
