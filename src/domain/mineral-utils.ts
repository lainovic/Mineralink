import { mineralData } from "./mineral-data";
import { mineralNameToSymbol, type Mineral, type MineralName, type MineralRelationship, type MineralSymbol } from "./Mineral";

export const minerals: Map<MineralSymbol, Mineral> = toMinerals(mineralData);

function toMinerals(mineralData: Record<MineralName, Object>): Map<MineralSymbol, Mineral> {
  const mineralObjects = Object.values(mineralData);
  const mineralValues = mineralObjects.map((obj: any) => ({
    name: obj.name as MineralName,
    symbol: obj.symbol as MineralSymbol,
    description: obj.description,
    synergistic: getSynergies(obj),
    antagonistic: getAntagonies(obj),
    category: obj.category || undefined,
  }));

  return new Map(mineralValues.map(m => [m.symbol, m]));
}

function getSynergies(obj: any): MineralRelationship[] {
  return (obj.synergistic || []).map((synergy: string) => {
      return extractRelationship(synergy);
    });
}

function getAntagonies(obj: any): MineralRelationship[] {
  return (obj.antagonistic || []).map((antagony: string) => {
    return extractRelationship(antagony);
  });
}

function extractRelationship(text: string): MineralRelationship {
  let name: string[] = [];
  let desc: string[] = [];
  let nameCompleted = false;
  for (let c of text) {
    if (c === "(") {
      if (name[name.length - 1] === " ") name.pop();
      nameCompleted = true;
    } else if (c === ")") {
      // end of description, ignore
    } else {
      if (nameCompleted) desc.push(c);
      else name.push(c);
    }
  }
  const nameStr = name.join("").trim();
  const descStr = desc.join("").trim();
  return {
    symbol: mineralNameToSymbol[nameStr as MineralName],
    description: descStr || undefined,
  };
}