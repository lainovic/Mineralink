import React, { type JSX } from "react";
import "./App.css";
import { minerals, mineralMap } from "./domain/mineral-utils";
import type {
  Mineral,
  MineralRelationship,
  MineralSymbol,
} from "./domain/Mineral";
import ReactMarkdown from "react-markdown";

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const [selectedMineralSymbol, setSelectedMineralSymbol] =
    React.useState<MineralSymbol | null>(null); // No mineral selected initially
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const [wheelSize, setWheelSize] = React.useState(800);
  const [visible, setVisible] = React.useState(true);

  const [llmResponse, setLlmResponse] = React.useState(""); // State to store LLM response
  const [llmLoading, setLlmLoading] = React.useState(false); // State for LLM loading indicator

  const fadeInOutDelay = 200;
  const numMinerals = mineralMap.size;
  const angleIncrement = (2 * Math.PI) / numMinerals;
  const itemSize = 90;
  const radius = wheelSize / 2 - itemSize / 2 - 10;

  const selectedMineral = selectedMineralSymbol
    ? mineralMap.get(selectedMineralSymbol)
    : null;

  const handleMineralClick = (mineralSymbol: MineralSymbol) => {
    if (selectedMineralSymbol === mineralSymbol) {
      // deselect
      setMineralSymbol(null);
    } else {
      setMineralSymbol(mineralSymbol);
    }
  };

  const setMineralSymbol = (symbol: MineralSymbol | null) => {
    setVisible(false);
    setLlmResponse("");
    setTimeout(() => {
      setSelectedMineralSymbol(symbol);
      setVisible(true);
    }, fadeInOutDelay);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setWheelSize(Math.min(window.innerWidth * 0.8, 800));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // get the center coordinates relative to the wheel container's center.
  const getMineralElementPosition = (idx: number): { x: number; y: number } => {
    const angle = idx * angleIncrement;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  const drawArrows = (
    relationships: MineralRelationship[],
    arrowColor: string
  ): JSX.Element[] => {
    if (!selectedMineral || relationships.length === 0) return [];

    return relationships
      .map((antagonist, index) => {
        const offset = wheelSize / 2;

        const startSymbolIdx = minerals.findIndex(
          (mineral: Mineral) => mineral.symbol === selectedMineral.symbol
        );

        const endSymbolIdx = minerals.findIndex(
          (mineral: Mineral) => mineral.symbol === antagonist.symbol
        );

        if (startSymbolIdx === -1 || endSymbolIdx === -1) return null;

        const startPos = getMineralElementPosition(startSymbolIdx);
        const endPos = getMineralElementPosition(endSymbolIdx);

        if (startPos && endPos) {
          return (
            <line
              key={`${arrowColor}-arrow-${index}`}
              x1={offset + startPos.x}
              y1={offset + startPos.y}
              x2={offset + endPos.x}
              y2={offset + endPos.y}
              stroke={arrowColor}
              strokeOpacity="0.3"
              strokeWidth="3"
              className="transition-opacity duration-300 ease-in-out opacity-50"
            />
          );
        }
        return null;
      })
      .filter((element): element is JSX.Element => element !== null);
  };

  const getDeficiencySymptoms = async () => {
    if (!selectedMineral) return;

    if (!apiKey) {
      setLlmResponse("Error: API key not configured. Please check your environment variables.");
      return;
    }

    setLlmLoading(true);
    setLlmResponse("");
    const prompt = `What are the common symptoms of ${selectedMineral.name} deficiency in humans? Provide a concise list.`;
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        if (
          result.candidates &&
          result.candidates.length > 0 &&
          result.candidates[0].content &&
          result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0
        ) {
          setLlmResponse(result.candidates[0].content.parts[0].text);
        } else {
          setLlmResponse("Could not retrieve symptoms. Please try again.");
          console.error("Unexpected LLM response structure:", result);
        }
      } else {
        setLlmResponse(`API Error: ${result.error?.message || 'Unknown error'}`);
        console.error("API Error:", result);
      }
    } catch (error) {
      setLlmResponse(
        "Error fetching symptoms. Please check your network or try again later."
      );
      console.error("Error calling Gemini API for symptoms:", error);
    } finally {
      setLlmLoading(false);
    }
  };

  const getFoodSources = async () => {
    if (!selectedMineral) return;

    if (!apiKey) {
      setLlmResponse("Error: API key not configured. Please check your environment variables.");
      return;
    }

    setLlmLoading(true);
    setLlmResponse("");
    const prompt = `What are some excellent food sources for ${selectedMineral.name}? Provide a concise list.`;
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        if (
          result.candidates &&
          result.candidates.length > 0 &&
          result.candidates[0].content &&
          result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0
        ) {
          setLlmResponse(result.candidates[0].content.parts[0].text);
        } else {
          setLlmResponse("Could not retrieve food sources. Please try again.");
          console.error("Unexpected LLM response structure:", result);
        }
      } else {
        setLlmResponse(`API Error: ${result.error?.message || 'Unknown error'}`);
        console.error("API Error:", result);
      }
    } catch (error) {
      setLlmResponse(
        "Error fetching food sources. Please check your network or try again later."
      );
      console.error("Error calling Gemini API for food sources:", error);
    } finally {
      setLlmLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-screen h-screen animated-gradient">
      {llmResponse && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="flex flex-col gap-2 items-center w-fit max-w-4xl bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-4 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Insights
              </h3>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-inner border border-gray-100">
              <div className="prose prose-indigo max-w-none text-gray-800 text-base sm:text-lg leading-relaxed">
                <ReactMarkdown>{llmResponse}</ReactMarkdown>
              </div>
            </div>
            <button
              className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-sm transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-64"
              onClick={() => {
                setLlmResponse("");
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <span>Close</span>
              </span>
            </button>
          </div>
        </div>
      )}
      {llmLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span className="text-indigo-700 font-semibold text-lg">
                Analyzing with AI...
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        ref={wheelRef}
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: wheelSize,
          height: wheelSize,
        }}
      >
        <svg
          className="absolute top-0 left-0"
          width={wheelSize}
          height={wheelSize}
          viewBox={`0 0 ${wheelSize} ${wheelSize}`}
        >
          {selectedMineral && (
            <>
              {drawArrows(selectedMineral.antagonistic, "red")}
              {drawArrows(selectedMineral.synergistic, "green")}
            </>
          )}
        </svg>

        {minerals.map((mineral: Mineral, idx: number) => {
          const pos = getMineralElementPosition(idx);
          if (!pos) return null;
          const { x, y } = pos;

          const isSelected = selectedMineralSymbol === mineral.symbol;

          const isAntagonistic =
            selectedMineral?.antagonistic.find(
              (relationship) => relationship.symbol === mineral.symbol
            ) !== undefined;

          const isSynergistic =
            selectedMineral?.synergistic.find(
              (relationship) => relationship.symbol === mineral.symbol
            ) !== undefined;

          return (
            <div
              key={mineral.symbol}
              className={[
                "absolute flex flex-col items-center justify-center text-center rounded-full shadow-md duration-300 ease-in-out",
                isSelected && "bg-indigo-100 transform ring-4 ring-indigo-300",
                !isSelected &&
                  isAntagonistic &&
                  !isSynergistic &&
                  "bg-red-100 transform ring-4 ring-red-300",
                !isSelected &&
                  !isAntagonistic &&
                  isSynergistic &&
                  "bg-green-100 transform ring-4 ring-green-300",
                !isSelected &&
                  isAntagonistic &&
                  isSynergistic &&
                  "bg-green-100 transform ring-4 ring-red-300",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                width: itemSize,
                height: itemSize,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                userSelect: "none",
              }}
              onClick={() => handleMineralClick(mineral.symbol)}
            >
              <span className={`${isSelected ? "animate-wiggle" : ""}`}>
                {mineral.symbol}
              </span>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: `opacity ${fadeInOutDelay}ms ease-in-out`,
            opacity: visible ? 1 : 0,
          }}
        >
          {selectedMineral ? (
            <>
              <div className="pb-8">
                <h2 className="text-indigo-700">{selectedMineral.name}</h2>
                <p>{selectedMineral.description}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-around mt-4 mb-4 overflow-y-auto max-h-[80vh]">
                  {selectedMineral.synergistic.length > 0 && (
                    <div className="bg-green-50/20 border border-green-200 rounded-xl p-4 shadow-sm flex-1 max-w-3xs">
                      <h3 className="font-semibold text-green-700 mb-2 text-lg flex items-center justify-center gap-1">
                        <span>🤝</span> Synergistic
                      </h3>
                      <ul className="space-y-1 text-left">
                        {selectedMineral.synergistic.map((rel) => (
                          <li key={rel.symbol} className="text-green-800 hover:bg-green-100/60 rounded px-2 transition">
                            <span className="font-bold">{rel.symbol}</span>
                            {rel.description && (
                              <span className="ml-2 text-sm text-green-600">
                                ({rel.description})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedMineral.antagonistic.length > 0 && (
                    <div className="bg-red-50/20 border border-red-200 rounded-xl p-4 shadow-sm flex-1 max-w-3xs">
                      <h3 className="font-semibold text-red-700 mb-2 text-lg flex items-center justify-center gap-1">
                        <span>⚡</span> Antagonistic
                      </h3>
                      <ul className="space-y-1 text-left">
                        {selectedMineral.antagonistic.map((rel) => (
                          <li key={rel.symbol} className="text-red-800 hover:bg-red-100/60 rounded px-2 transition">
                            <span className="font-bold">{rel.symbol}</span>
                            {rel.description && (
                              <span className="ml-2 text-sm text-red-600">
                                ({rel.description})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-3 items-center">
                <button
                  onClick={getDeficiencySymptoms}
                  className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-sm transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-64"
                  disabled={llmLoading}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✨ Show Deficiency Symptoms</span>
                  </span>
                </button>
                <button
                  onClick={getFoodSources}
                  className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-sm transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-64"
                  disabled={llmLoading}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✨ Suggest Food Sources</span>
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h1
                className="
    text-4xl
    font-extrabold
    text-center
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    bg-clip-text
    text-transparent
    tracking-wider
    mt-8
    mb-8
    drop-shadow-md
  "
              >
                MineraLink
              </h1>
              <p>Select a mineral to see details.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
