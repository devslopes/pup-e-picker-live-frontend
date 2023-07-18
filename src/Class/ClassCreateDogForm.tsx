import { Component } from "react";
import { Dog } from "../types";
import { dogPictures } from "../dog-pictures";

type Props = {
  addDog: (dog: Omit<Dog, "id" | "isFavorite">) => void;
};

type State = {
  nameInput: string;
  descriptionInput: string;
  selectedImage: string;
};

export class ClassCreateDogForm extends Component<Props, State> {
  state: State = {
    descriptionInput: "",
    nameInput: "",
    selectedImage: dogPictures.BlueHeeler,
  };

  reset = () => {
    this.setState({
      descriptionInput: "",
      nameInput: "",
      selectedImage: dogPictures.BlueHeeler,
    });
  };
  render() {
    const { nameInput, descriptionInput, selectedImage } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.props.addDog({
            name: nameInput,
            description: descriptionInput,
            image: selectedImage,
          });
          this.reset();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={descriptionInput}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            this.setState({ selectedImage: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  }
}
