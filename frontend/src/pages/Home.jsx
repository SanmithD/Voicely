
import RecentSearches from "../components/RecentSearches ";
import SingleThread from "../components/SingleThread";

function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col gap-4 md:w-[70%] h-screen overflow-y-scroll ml-3.5">
        <SingleThread limit={500} />
      </div>
      <div className="hidden md:block lg:block w-[30%] border-l border-gray-300 px-4">
        <RecentSearches />
      </div>
    </div>
  );
}

export default Home;
