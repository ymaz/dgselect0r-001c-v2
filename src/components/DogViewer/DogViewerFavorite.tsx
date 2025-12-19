export const DogViewerFavorite = ({
  data,
  deleteFromFavorite,
}: {
  data: Set<string>;
  deleteFromFavorite: (dogImgUrl: string) => void;
}) => {
  return (
    <aside className="dog-viewer-favorite">
      <h2 className="dog-viewer-favorite-title">Favorites: {data.size}</h2>
      <ul className="dog-viewer-favorite-list">
        {[...data].map((dogImgUrl: string) => (
          <li key={dogImgUrl} className="dog-viewer-favorite-item">
            <img
              className="dog-viewer-favorite-img"
              src={dogImgUrl}
              alt="Favorite dog"
            />
            <button
              type="button"
              className="dog-viewer-favorite-remove-btn"
              onClick={() => deleteFromFavorite(dogImgUrl)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
