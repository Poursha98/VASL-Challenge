import { useGame } from "@/utils/GameContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { match, dispatch, cards } = useGame();
  const numMatched = (Math.floor(match.length) / 2).toLocaleString("fa");
  const numPair = (Math.floor(cards?.length) / 2).toLocaleString("fa");
  return (
    <nav className="w-full h-[50px] bg-gray-900/60 text-gray-300 text-lg absolute inset-0 z-100 flex items-center ">
      <div className="flex items-center justify-between p-4 w-full max-w-[900px] mx-auto">
        <div className="flex items-center gap-4">
          {numMatched === numPair ? (
            <span>پایان بازی</span>
          ) : (
            <>
              <span>امتیاز</span>
              <span>
                {numMatched}/{numPair}
              </span>
            </>
          )}
        </div>
        <Button
          className="bg-gray-900/90  hover:bg-gray-700/60 rounded-2xl cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "reset" });
          }}
        >
          شروع مجدد
        </Button>
      </div>
    </nav>
  );
}
