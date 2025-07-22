import React from "react";
import "./App.css";
import { minerals } from "./domain/mineral-utils";
import type { Mineral, MineralSymbol } from "./domain/Mineral";

function App() {
  const [selectedMineralSymbol, setSelectedMineralSymbol] =
    React.useState<MineralSymbol | null>(null); // No mineral selected initially
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const [wheelSize, setWheelSize] = React.useState(800);

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     if (wheelRef.current) {
  //       const containerWidth = wheelRef.current.offsetWidth;
  //       // Adjust this factor as needed for desired responsiveness
  //       setWheelSize(Math.min(containerWidth * 1.8, 800)); // Max 800px, min 80% of container
  //     }
  //   };

  //   handleResize(); // Set initial size
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const selectedMineral = selectedMineralSymbol
    ? minerals.get(selectedMineralSymbol)
    : null;

  const numMinerals = minerals.size
  const angleIncrement = (2 * Math.PI) / numMinerals;

  const itemSize = 90;

  // Radius for positioning mineral items, with a small buffer from edge
  const radius = wheelSize / 2 - itemSize / 2 - 10; 

  // These are the center coordinates relative to the wheel container's center.
  const getMineralElementPosition = (
    idx: number
  ): { x: number; y: number } | null => {
    const angle = idx * angleIncrement;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div
      ref={wheelRef}
      className="absolute flex items-center justify-center mb-8"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: wheelSize,
        height: wheelSize,
      }}
    >
      {[...minerals.values()].map((mineral: Mineral, idx: number) => {
        const pos = getMineralElementPosition(idx);
        if (!pos) return null;
        const { x, y } = pos;

        const isSelected = selectedMineralSymbol === mineral.symbol;

        const isAntagonistic = mineral.antagonistic.find(
          (relationship) => relationship.symbol === selectedMineralSymbol
        )

        const isSynergistic = mineral.synergistic.find(
          (relationship) => relationship.symbol === selectedMineralSymbol
        )

        return (
          <div
            key={mineral.symbol}
            className={[
              "absolute flex flex-col items-center justify-center text-center rounded-full shadow-md duration-300 ease-in-out",
              isSelected && "bg-indigo-100 transform ring-4 ring-indigo-300",
              !isSelected && isAntagonistic && "bg-red-100 transform ring-4 ring-red-300",
              !isSelected && !isAntagonistic && isSynergistic && "bg-green-100 transform ring-4 ring-green-300"
            ].filter(Boolean).join(" ")}
            style={{
              width: itemSize,
              height: itemSize,
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
              userSelect: "none",
            }}
            onClick={() => setSelectedMineralSymbol(mineral.symbol)}
          >
            <span>{mineral.symbol}</span>
          </div>
        );
      })}
        <div
        style={{
          position: "absolute",
          textAlign: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        >{selectedMineral ? selectedMineral.description : "Select a mineral"}
        </div>
    </div>
  );
}

export default App;
