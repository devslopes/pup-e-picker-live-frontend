import { Icons } from "../icons";

// ! Do Not Change This Component
export const FavoriteButton = ({ onClick }: { onClick: () => void }) => (
  <img
    src={Icons.EmptyHeart}
    alt=""
    className="favorite-button"
    style={{ width: 40, border: 0 }}
    onClick={() => {
      onClick();
    }}
  />
);
