export const DogViewerFavorite = ({
  data,
  deleteFromFavorite,
  onSelect,
}: {
  data: Set<string>;
  deleteFromFavorite: (dogImgUrl: string) => void;
  onSelect: (dogImgUrl: string) => void;
}) => {
  return (
    <aside className="dog-viewer-favorite">
      <h2 className="dog-viewer-favorite-title">Favorites: {data.size}</h2>
      <ul className="dog-viewer-favorite-list">
        {[...data].map((dogImgUrl: string) => (
          <li key={dogImgUrl} className="dog-viewer-favorite-item">
            <>
              <button
                type="button"
                className="dog-viewer-favorite-select-button"
                title="Select current dog"
                onClick={() => onSelect(dogImgUrl)}
              >
                <img
                  className="dog-viewer-favorite-img"
                  src={dogImgUrl}
                  alt="Favorite dog"
                />
              </button>
              <button
                type="button"
                className="dog-viewer-favorite-remove-btn"
                title="Remove current dog from favorite list"
                onClick={() => deleteFromFavorite(dogImgUrl)}
              >
                Remove
              </button>
            </>
          </li>
        ))}
      </ul>
    </aside>
  );
};
