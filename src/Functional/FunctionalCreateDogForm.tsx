import { useState } from "react";
import { dogPictures } from "../assets/dog-pictures";
import { Dog } from "../types";

export const FunctionalCreateDogForm = ({
  addDog,
}: {
  addDog: (dog: Omit<Dog, "id" | "isFavorite">) => void;
}) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        addDog({
          name: nameInput,
          description: descriptionInput,
          image: selectedImage,
        });
        setDescriptionInput("");
        setNameInput("");
        setSelectedImage(dogPictures.BlueHeeler);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
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
          setDescriptionInput(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setSelectedImage(e.target.value);
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
};
