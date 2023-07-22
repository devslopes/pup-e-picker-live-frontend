import { z } from "zod";
import { Dog, dogSchema } from "./types";
import { v4 as uuidV4 } from "uuid";

const getUniqueId = () => {
  const userIdFromLocalStorage = localStorage.getItem("pup-e-picker-user-id");
  if (!userIdFromLocalStorage) {
    const newId = (uuidV4 as () => string)();
    localStorage.setItem("pup-e-picker-user-id", newId);
    return newId;
  }
  return userIdFromLocalStorage;
};

const getAuthHeader = () => ({
  "pup-e-picker-user-id": getUniqueId(),
});

export const baseUrl = (import.meta.url || "").includes("http:/")
  ? "http://localhost:4000"
  : "https://pup-e-picker-live-be.vercel.app";

export const getAllDogs = () =>
  fetch(`${baseUrl}/dogs`, {
    headers: {
      ...getAuthHeader(),
    },
  })
    .then((response) => response.json())
    .then((data) => z.array(dogSchema).parse(data));

export const postDog = (dog: Omit<Dog, "id" | "isFavorite">) =>
  fetch(`${baseUrl}/dogs`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ ...dog, isFavorite: false }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create dog");
    }
    return response;
  });

export const deleteDogRequest = (dogId: number) =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "delete",
    headers: {
      ...getAuthHeader(),
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create dog");
    }
    return response;
  });

export const patchFavoriteForDog = ({
  dogId,
  isFavorite,
}: {
  dogId: number;
  isFavorite: boolean;
}) =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    method: "PATCH",
    body: JSON.stringify({
      isFavorite,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("could not update dog");
    }
    return response;
  });

export const reseed = () =>
  fetch(`${baseUrl}/reseed`, {
    method: "post",
    headers: {
      ...getAuthHeader(),
    },
  });
