import { Component } from "react";
import { Dog } from "../types";
import {
  deleteDogRequest,
  getAllDogs,
  patchFavoriteForDog,
  postDog,
  reseed,
} from "../fetch-calls";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { toast } from "react-hot-toast";
type State = {
  showComponent: string;
  dogs: Dog[];
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    dogs: [],
    showComponent: "all-dogs",
    isLoading: false,
  };

  componentDidMount(): void {
    this.refetchDogs();
  }

  refetchDogs = () => {
    this.setState({ isLoading: true });
    getAllDogs()
      .then((dogs) => {
        this.setState({ dogs });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  addDog = (dog: Omit<Dog, "id" | "isFavorite">) => {
    this.setState({ isLoading: true });
    return postDog(dog)
      .then(() => this.refetchDogs())
      .then(() => {
        toast.success(`created ${dog.name}`);
      })
      .catch((e) => {
        toast.error(`could not create ${dog.name}`);
        console.error(e);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  deleteDog = (dogId: number) => {
    this.setState({ isLoading: true });
    deleteDogRequest(dogId)
      .then(() => this.refetchDogs())
      .catch(console.error)
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  unfavoriteDog = (dogId: number) => {
    this.setState({ isLoading: true });
    patchFavoriteForDog({ dogId, isFavorite: false })
      .then(() => this.refetchDogs())
      .catch(console.error)
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  favoriteDog = (dogId: number) => {
    this.setState({ isLoading: true });

    patchFavoriteForDog({ dogId, isFavorite: true })
      .then(() => this.refetchDogs())
      .catch(console.error)
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  reseedDogs = () => {
    this.setState({ isLoading: true });
    reseed()
      .then(() => this.refetchDogs())
      .then(() => toast.success("reseeded"))
      .catch((e) => {
        toast.error("something went wrong");
        console.error(e);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { dogs, showComponent } = this.state;
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
        this.setState({ showComponent: "all-dogs" });
        return;
      }
      this.setState({ showComponent: "favorite-dogs" });
    };

    const onClickUnfavorited = () => {
      if (showComponent === "unfavorite-dogs") {
        this.setState({ showComponent: "all-dogs" });
        return;
      }
      this.setState({ showComponent: "unfavorite-dogs" });
    };

    const onClickCreateDog = () => {
      if (showComponent === "create-dog-form") {
        this.setState({ showComponent: "all-dogs" });
        return;
      }
      this.setState({ showComponent: "create-dog-form" });
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          label={"Dogs: "}
          onClickFavorited={onClickFavorited}
          onClickUnfavorited={onClickUnfavorited}
          onClickCreateDog={onClickCreateDog}
          showComponent={showComponent}
          favoriteDogCount={favorited.length}
          unfavoriteDogCount={unfavorited.length}
          reseedDogs={this.reseedDogs}
        >
          <>
            {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
              showComponent
            ) && (
              <ClassDogs
                dogs={filteredDogs}
                unfavoriteDog={this.unfavoriteDog}
                deleteDog={this.deleteDog}
                favoriteDog={this.favoriteDog}
                isLoading={this.state.isLoading}
              />
            )}
            {showComponent === "create-dog-form" && (
              <ClassCreateDogForm
                addDog={this.addDog}
                isLoading={this.state.isLoading}
              />
            )}
          </>
        </ClassSection>
      </div>
    );
  }
}
