import fetch from "node-fetch";
import https from "https";
import fs from "fs";
import path from "path";
import { FOLDER_PATH_DOWNLOADED_CONTENT } from "@/globals";

export async function fetchDataByUrl(url: string) {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export function downloadPng(url: string, outputPath: string) {
  https
    .get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(
          path.join(FOLDER_PATH_DOWNLOADED_CONTENT, outputPath)
        );
        response.pipe(fileStream);
        response.on("end", () => {
          fileStream.close();
        });
      } else {
        console.error(
          `Failed to download ${url}. Status code: ${response.statusCode}`
        );
      }
    })
    .on("error", (error) => {
      console.error(`Error while downloading ${url}: ${error.message}`);
    });
}
