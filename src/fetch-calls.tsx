import { z } from "zod";
import { Dog, dogSchema } from "./types";
export const baseUrl = (import.meta?.url || "").includes("localhost:517")
  ? "http://localhost:4000"
  : "https://pup-e-picker-live-be.vercel.app";

export const getAllDogs = () =>
  fetch(`${baseUrl}/dogs`)
    .then((response) => response.json())
    .then((data) => z.array(dogSchema).parse(data));

export const postDog = (dog: Omit<Dog, "id" | "isFavorite">) =>
  fetch(`${baseUrl}/dogs`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
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
  });
