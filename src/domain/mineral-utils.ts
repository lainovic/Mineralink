import { mineralData } from "./mineral-data";
import { mineralNameToSymbol, type Mineral, type MineralName, type MineralRelationship, type MineralSymbol } from "./Mineral";

function toMinerals(mineralData: Record<MineralName, Object>): Mineral[] {
  const mineralObjects = Object.values(mineralData);
  const mineralValues = mineralObjects.map((obj: any) => ({
    name: obj.name as MineralName,
    symbol: obj.symbol as MineralSymbol,
    description: obj.description,
    synergistic: getSynergies(obj),
    antagonistic: getAntagonies(obj),
    category: obj.category || undefined,
  }));

  return mineralValues;
}

function getSynergies(obj: any): MineralRelationship[] {
  return (obj.synergistic || []).map((synergist: string) => {
      return extractRelationship(synergist);
    });
}

function getAntagonies(obj: any): MineralRelationship[] {
  return (obj.antagonistic || []).map((antagonist: string) => {
    return extractRelationship(antagonist);
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

export const minerals: Mineral[] = toMinerals(mineralData);
export const mineralMap: Map<MineralSymbol, Mineral> = new Map(minerals.map(m => [m.symbol, m]));
