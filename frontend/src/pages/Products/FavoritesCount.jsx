import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="absolute left-4 top-7 bg-pink-500 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-xs font-bold">
          {favoriteCount}
        </span>
      )}
    </>
  );
};

export default FavoritesCount;