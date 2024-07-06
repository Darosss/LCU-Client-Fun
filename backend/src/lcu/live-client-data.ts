import axios from "axios";
import https from "https";
import { EventName, LiveGameDataBaseEvent } from "./types";

// Create an HTTPS agent to allow self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false // This will allow self-signed certificates
});

export async function fetchLiveClientDataEventData() {
  try {
    const response = await axios.get<{ Events: LiveGameDataBaseEvent[] }>(
      "https://127.0.0.1:2999/liveclientdata/eventdata",
      { httpsAgent }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching event data. Probably no session or no connection"
    );
  }
}

export function findEventByEventName(
  events: LiveGameDataBaseEvent[],
  name: EventName | null
) {
  return name ? events.find((data) => data.EventName === name) : undefined;
}

export function liveGameDataBaseEventObserver(
  previousEvents: LiveGameDataBaseEvent[],
  newEvents: LiveGameDataBaseEvent[]
) {
  if (previousEvents.length === newEvents.length) return null;
  const eventsDiff: LiveGameDataBaseEvent[] = [];
  for (
    let indexReverse = newEvents.length - 1;
    indexReverse >= previousEvents.length;
    indexReverse--
  ) {
    const eventData = newEvents[indexReverse];
    eventData ? eventsDiff.push(eventData) : null;
  }

  return eventsDiff;
}
