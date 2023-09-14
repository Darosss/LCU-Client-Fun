import fetch from "node-fetch";
import https from "https";
import fs from "fs";

export async function fetchDataByUrl(url: string) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

export function downloadPng(url: string, outputPath: string) {
  https
    .get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(`${__dirname}\\${outputPath}`);
        response.pipe(fileStream);
        response.on("end", () => {
          fileStream.close();
          console.log(`Downloaded ${url} to ${__dirname}\\${outputPath}`);
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
