import { useGame } from "@/utils/GameContext";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatePresence, motion } from "motion/react";

export default function Navbar() {
  const { status, match, dispatch, cards } = useGame();
  const numMatched = (Math.floor(match.length) / 2).toLocaleString("fa");
  const numPair = (Math.floor(cards?.length) / 2).toLocaleString("fa");
  return (
    <AnimatePresence mode="popLayout">
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "50px" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full h-[50px] bg-gray-900/60 text-gray-300 text-lg absolute inset-0 z-100 flex items-center "
      >
        <div className="flex items-center justify-between p-4 w-full max-w-[900px] mx-auto">
          <div className="flex items-center gap-4">
            {numMatched === numPair ? (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: "home" });
                }}
                className="cursor-pointer text-gray-300 hover:text-gray-400"
              >
                بازگشت
              </span>
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
            className="bg-gray-900/90  hover:bg-gray-700/60 rounded-2xl cursor-pointer relative"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "reset" });
            }}
          >
            <span>شروع مجدد</span>
            {status === "finished" && (
              <>
                <BorderBeam
                  duration={2}
                  size={45}
                  colorFrom="#7a0101"
                  colorTo="#7765c7"
                  borderWidth={2}
                />
                <BorderBeam
                  duration={2}
                  size={45}
                  colorFrom="#00ff99"
                  colorTo="#fff200"
                  borderWidth={2}
                  reverse
                />
              </>
            )}
          </Button>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
