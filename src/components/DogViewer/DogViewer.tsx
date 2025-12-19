import { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { DogViewerThumbnails } from "./DogViewerThumbnails";
import { DogViewerFavorite } from "./DogViewerFavorite";
import { RANDOM_DOG_API } from "../../constants";
import "./DogViewer.css";

export interface DogsData {
  message: string[];
  status: string;
}

export interface DogsDataRemapped {
  dogImgUrl: string;
  breedValue: string;
}

const getBreedValueFromUrl = (url = "") => {
  // assuming the following url pattern:
  // https://images.dog.ceo/breeds/segugio-italian/n02090722_002.jpg
  return (
    url?.split("breeds")?.[1]?.split("/")?.[1]?.replace("-", " ") ??
    "Unknown breed"
  );
};

const getRandomIndex = (arrayLength = 0) => {
  return Math.floor(Math.random() * arrayLength);
};

export const DogViewer = ({ itemsLimit = 10 }) => {
  const URL = `${RANDOM_DOG_API}${itemsLimit}`;
  const { data, loading, error } = useFetch<DogsData>(URL);
  const [userSelectedDog, setUserSelectedDog] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const remappedData = useMemo(
    () =>
      data?.message?.map(
        (item): DogsDataRemapped => ({
          dogImgUrl: item,
          breedValue: getBreedValueFromUrl(item),
        }),
      ) ?? [],
    [data?.message],
  );
  const initialRandomDog = useMemo(() => {
    if (data?.message?.length) {
      return data.message[getRandomIndex(data.message.length)];
    }
    return null;
  }, [data]);
  const selectedDog = userSelectedDog ?? initialRandomDog;

  const onSelect = (dogImgUrl: string) => {
    setUserSelectedDog(dogImgUrl);
  };

  const addToFavorite = (dogImgUrl: string) => {
    setFavorites((prev) => new Set(prev).add(dogImgUrl));
  };

  const deleteFromFavorite = (dogImgUrl: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(dogImgUrl);
      return newFavorites;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error: <pre>{error}</pre>
      </p>
    );

  return (
    <div className="dog-viewer">
      <main className="dog-viewer-main">
        <div className="dog-viewer-selected">
          {selectedDog ? (
            <>
              <img
                src={selectedDog}
                className="dog-viewer-selected-img"
                alt="Current selected dog image"
              />
              <p className="dog-viewer-selected-footer">
                <span className="dog-viewer-selected-value">
                  {getBreedValueFromUrl(selectedDog)}
                </span>
                <button
                  type="button"
                  title="Add current selected dog to favorite list"
                  className="dog-viewer-selected-button"
                  onClick={() => addToFavorite(selectedDog)}
                >
                  Favorite
                </button>
              </p>
            </>
          ) : (
            <p className="dog-viewer-placeholder">Select a dog to view</p>
          )}
        </div>
        <DogViewerThumbnails
          data={remappedData}
          onSelect={onSelect}
          selectedDog={selectedDog}
        />
      </main>
      {favorites.size > 0 && (
        <DogViewerFavorite
          data={favorites}
          onSelect={onSelect}
          deleteFromFavorite={deleteFromFavorite}
        />
      )}
    </div>
  );
};
