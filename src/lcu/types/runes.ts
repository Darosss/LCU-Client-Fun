export interface RunesData {
  iconPath: string;
  id: number;
  longDesc: string;
  name: string;
  recommendationDescriptor: string;
  shortDesc: string;
  slotType: string;
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
  type: HeadRuneSlotType;
}

export enum HeadRuneSlotType {
  K_KEY_STONE = "kKeyStone",
  K_STAT_MOD = "kStatMod",
  K_MIXED_REGULAR_SPLASHABLE = "kMixedRegularSplashable",
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
  selectedPerkIds: [
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
  subStyleId: number;
  tooltipBgPath: string;
  // We know min and max is 9 runes
  uiPerks:
    | [
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
}

interface RunePageDataPerk {
  id: number;
  name: string;
  slotType: string;
  styleId: number;
}

export interface OwnedRunePageCountData {
  ownedPageCount: number;
}

export interface CreateRunePageBody {
  name: string;
  isEditable: boolean;
  primaryStyleId: number;
}

export enum RuneStyle {
  PRIMARY,
  SECONDARY,
}