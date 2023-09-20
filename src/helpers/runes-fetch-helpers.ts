import {
  dataFileExists,
  readData,
  writeData,
  downloadPng,
  createFolder,
} from ".";
import type { HeadRuneData, RunesData } from "@lcu";
import {
  BASE_RAW_COMMUNITY_DRAGON_GAME_DATA,
  CURRENT_LOL_VERSION,
} from "@globals";
import path from "path";

const basePathRunesIcons = `/lol-game-data/assets/v1/`;

const runesFilePath = `runes${CURRENT_LOL_VERSION.trim()}.json`;
const headRunesFilePath = `head-runes${CURRENT_LOL_VERSION.trim()}.json`;

export function getDragonRunesData() {
  return readData<RunesData[]>(runesFilePath);
}

export function getDragonHeadRunesData() {
  return readData<HeadRuneData[]>(headRunesFilePath);
}

export function writeDragonRunesData(value: RunesData[]) {
  writeData<RunesData[]>(runesFilePath, value);
}

export function writeDragonHeadRunesData(value: HeadRuneData[]) {
  writeData<HeadRuneData[]>(headRunesFilePath, value);
}

export function ifDataDragonRunesDoesNotExist() {
  if (!dataFileExists(runesFilePath)) return true;
}
export function ifDataDragonHeadRunesDoesNotExist() {
  if (!dataFileExists(headRunesFilePath)) return true;
}

export function downloadRunesPngs(runesData: RunesData[] | HeadRuneData[]) {
  runesData.forEach((data) => {
    const outputPath = data.iconPath.toLowerCase();
    const iconPathSplit = data.iconPath.split("/");

    const idxOfPerkImages = iconPathSplit.findIndex(
      (data) => data === "perk-images"
    );

    const suffixPathToDownload = iconPathSplit.slice(idxOfPerkImages);
    const suffixPathToFolder =
      basePathRunesIcons +
      suffixPathToDownload
        .slice(0, suffixPathToDownload.length - 1)
        .join("/")
        .toLowerCase();

    if (!dataFileExists(suffixPathToFolder)) {
      createFolder(suffixPathToFolder);
    }
    const url = path.join(
      BASE_RAW_COMMUNITY_DRAGON_GAME_DATA,
      "v1",
      suffixPathToDownload.join("/").toLowerCase()
    );

    downloadPng(url, outputPath);
  });
}

export function downloadHeadRunesPngs(runesData: HeadRuneData[]) {
  runesData.forEach((data) => {
    const outputPath = data.iconPath.toLowerCase();
    const iconPathSplit = data.iconPath.split("/");

    const idxOfPerkImages = iconPathSplit.findIndex(
      (data) => data === "perk-images"
    );

    const suffixPathToDownload = iconPathSplit.slice(idxOfPerkImages);
    const suffixPathToFolder =
      basePathRunesIcons +
      suffixPathToDownload
        .slice(0, suffixPathToDownload.length - 1)
        .join("/")
        .toLowerCase();

    if (!dataFileExists(suffixPathToFolder)) {
      createFolder(suffixPathToFolder);
    }
    const url = path.join(
      BASE_RAW_COMMUNITY_DRAGON_GAME_DATA,
      "v1",
      suffixPathToDownload.join("/").toLowerCase()
    );

    downloadPng(url, outputPath);
  });
}
