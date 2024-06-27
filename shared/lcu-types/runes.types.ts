import { PositionsPreferences } from "../lcu-enums/lobby.enums";
import {
  RuneSlotType,
  RunesRecommendationAvailablePositions,
} from "../lcu-enums/runes.enums";

export interface RunesData {
  iconPath: string;
  id: number;
  longDesc: string;
  name: string;
  recommendationDescriptor: string;
  shortDesc: string;
  slotType: RuneSlotType;
  styleId: number;
  styleIdName: string;
  tooltip: string;
}

export interface HeadRuneData {
  allowedSubStyles: number[];
  assetMap: any; //Not needed
  defaultPageName: string;
  defaultPerks: number[];
  defaultSubStyle: number;
  iconPath: string;
  id: number;
  idName: string;
  name: string;
  slots: HeadRuneSlot[];
  subStyleBonus: HeadRuneSubStyleBonus;
  tooltip: string;
}

export interface HeadRuneSlot {
  perks: number[];
  slotLabel: string;
  type: RuneSlotType;
}

interface HeadRuneSubStyleBonus {
  perkId: number;
  styleId: number;
}

export interface RunePageData {
  current: boolean;
  id: number;
  isActive: boolean;
  isDeletable: boolean;
  isEditable: boolean;
  isRecommendationOverride: boolean;
  isTemporary: boolean;
  isValid: boolean;
  lastModified: number;
  name: string;
  order: number;
  pageKeystone: RunePageDataPerk[];
  primaryStyleIconPath: string;
  primaryStyleId: number;
  primaryStyleName: string;
  quickPlayChampionIds: [];
  recommendationChampionId: number;
  recommendationIndex: number;
  runeRecommendationId: string;
  secondaryStyleIconPath: string;
  secondaryStyleName: string;
  // We know min and max is 9 runes
  selectedPerkIds: SelectedPerkIds;
  subStyleId: number;
  tooltipBgPath: string;
  // We know min and max is 9 runes
  uiPerks: UIPerks;
}

export type SelectedPerkIds = [
  number, // this is primary keystone
  number, // this is primary
  number, // this is primary
  number, // this is primary
  number, // this is subStyle
  number, // this is subStyle
  number, // this is kStatMod
  number, // this is kStatMod
  number // this is kStatMod
];

type UIPerks = [
  RunePageDataPerk, // this is primary keystone
  RunePageDataPerk, // this is primary
  RunePageDataPerk, // this is primary
  RunePageDataPerk, // this is primary
  RunePageDataPerk, // this is subStyle
  RunePageDataPerk, // this is subStyle
  RunePageDataPerk, // this is kStatMod
  RunePageDataPerk, // this is kStatMod
  RunePageDataPerk // this is kStatMod
];

interface RunePageDataPerk {
  id: number;
  name: string;
  slotType: string;
  styleId: number;
}

export interface OwnedRunePageCountData {
  ownedPageCount: number;
}

export interface CreateRunePageBody extends Partial<RunePageData> {
  name: string;
  isEditable: boolean;
  primaryStyleId: number;
}

export interface RecommendedRunesData {
  isDefaultPosition: boolean;
  isRecommendationOverride: boolean;
  keystone: RunesData;
  perks: RecommendedRunesDataPerks;
  position: RunesRecommendationAvailablePositions;
  primaryPerkStyleId: number;
  primaryRecommendationAttribute: string;
  recommendationChampionId: number;
  recommendationId: string;
  secondaryPerkStyleId: number;
  secondaryRecommendationAttribute: string;
  summonerSpellIds: [number, number];
}

type RecommendedRunesDataPerks = [
  RunesData,
  RunesData,
  RunesData,
  RunesData,
  RunesData,
  RunesData,
  RunesData,
  RunesData,
  RunesData
];

export type GetRecommendedPagesByChampIdPositionAndMapIdParams = {
  champId: number;
  position: Omit<PositionsPreferences, "FILL" | "UNSELECTED">;
  mapId: number;
};
