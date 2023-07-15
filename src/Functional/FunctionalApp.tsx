import { useEffect, useState } from "react";
import { Dog } from "../types";
import {
  deleteDogRequest,
  getAllDogs,
  patchFavoriteForDog,
  postDog,
  reseed,
} from "../fetch-calls";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState<Dog[]>([]);

  const refetchDogs = () => {
    getAllDogs()
      .then(setDogs)
      .catch((e) => {
        console.error(e);
      });
  };

  const addDog = (dog: Omit<Dog, "id" | "isFavorite">) => {
    postDog(dog)
      .then(() => refetchDogs())

      .then(() => {
        toast.success(`created ${dog.name}`);
      })
      .catch((e) => {
        toast.error(`could not create ${dog.name}`);
        console.error(e);
      });
  };

  const deleteDog = (dogId: number) => {
    deleteDogRequest(dogId)
      .then(() => refetchDogs())
      .catch(console.error);
  };

  const unfavoriteDog = (dogId: number) => {
    patchFavoriteForDog({ dogId, isFavorite: false })
      .then(() => refetchDogs())
      .catch(console.error);
  };

  const favoriteDog = (dogId: number) => {
    patchFavoriteForDog({ dogId, isFavorite: true })
      .then(() => refetchDogs())
      .catch(console.error);
  };

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  const filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  const reseedDogs = () => {
    reseed()
      .then(() => refetchDogs())
      .then(() => toast.success("reseeded"))
      .catch((e) => {
        toast.error("something went wrong");
        console.error(e);
      });
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        label={"Dogs: "}
        onClickFavorited={onClickFavorited}
        onClickUnfavorited={onClickUnfavorited}
        onClickCreateDog={onClickCreateDog}
        showComponent={showComponent}
        favoriteDogCount={favorited.length}
        unfavoriteDogCount={unfavorited.length}
        reseedDogs={reseedDogs}
      >
        <>
          {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
            showComponent
          ) && (
            <FunctionalDogs
              dogs={filteredDogs}
              unfavoriteDog={unfavoriteDog}
              deleteDog={deleteDog}
              favoriteDog={favoriteDog}
            />
          )}
          {showComponent === "create-dog-form" && (
            <FunctionalCreateDogForm addDog={addDog} />
          )}
        </>
      </FunctionalSection>
    </div>
  );
}
