import { Dog } from "../types";
import { FunctionalDogCard } from "../Shared/DogCard";
import { Component } from "react";

type Handler = (dogId: number) => void;

type Props = {
  dogs: Dog[];
  deleteDog: Handler;
  unfavoriteDog: Handler;
  favoriteDog: Handler;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export class ClassDogs extends Component<Props> {
  render() {
    const { deleteDog, dogs, favoriteDog, unfavoriteDog } = this.props;
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {dogs.map((dog) => (
          <FunctionalDogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => deleteDog(dog.id)}
            onHeartClick={() => unfavoriteDog(dog.id)}
            onEmptyHeartClick={() => favoriteDog(dog.id)}
          />
        ))}
      </>
    );
  }
}
