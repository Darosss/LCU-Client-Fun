import fetch from "node-fetch";

export async function getData(url: string) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}
