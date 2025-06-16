import { useSearchStore } from "../store/UseSearchStore";


const RecentSearches = () => {
  const recent = useSearchStore((state) => state.recent);

  return (
    <div className="w-60 p-4">
      <h2 className="font-semibold text-lg mb-3">Recent Searches</h2>
      {recent.length > 0 ? (
        <ul className="space-y-1 text-sm text-gray-700">
          {recent.map((item, index) => (
            <li key={index} className="truncate">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No recent searches</p>
      )}
    </div>
  );
};

export default RecentSearches;
