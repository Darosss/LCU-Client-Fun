import { ClientToServerEvents, ServerToClientEvents } from "@/shared";
import { Server, Socket } from "socket.io";
import {
  lcuHandlerFactory,
  queues,
  readLocalStorageData,
  updateLocalStorageData
} from "@/lcu";
import {
  dragonChampionsData,
  dragonSpellsData,
  findChampionById,
  getDragonHeadRunesData,
  getDragonRunesData
} from "@/helpers";
import { SocketHandler } from "./socket";

export function addSocketOnEvents(
  io: Server<ClientToServerEvents, ServerToClientEvents, any, any>
) {
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      socket.on("disconnect", () => {
        console.log("disconnected!", socket.id);
      });
      console.log("connected!", socket.id);
      setTimeout(async () => {
        const headHandler = lcuHandlerFactory.getHeadHandler();
        if (!headHandler) return;

        headHandler
          .getCurrentSummoner()
          .then((summonerData) => socket.emit("currentSummoner", summonerData));

        const gameFlowPhase = await headHandler.getGameflowPhase();
        if (!gameFlowPhase) return;
        socket.emit("gameflowPhase", gameFlowPhase);

        if (
          gameFlowPhase === "Lobby" ||
          gameFlowPhase === "Matchmaking" ||
          gameFlowPhase === "ReadyCheck" ||
          gameFlowPhase === "ChampSelect"
        ) {
          const lobbyData = await lcuHandlerFactory
            .getLobbyHandler()
            ?.getLobbyData();

          socket.emit("lobbyData", lobbyData!);
        }
      }, 1500);

      socket.emit("clientOptions", readLocalStorageData());

      socket.on("changeClientOptions", (data, callback) => {
        try {
          updateLocalStorageData(data);

          const currentConfig = readLocalStorageData();

          const headHandler = lcuHandlerFactory.getHeadHandler();
          if (readLocalStorageData().preventRiotClientToTurnOn)
            headHandler?.preventClientUXToTurnOn();
          else headHandler?.unsusbcribePreventClientUXToTurnOn();

          SocketHandler.getInstance()
            .getIO()
            .emit("clientOptions", currentConfig);

          callback(null, currentConfig);
        } catch (error) {
          console.error("Error occured in changeClientOptions event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to change client options");
        }
      });

      if (!lcuHandlerFactory.getFullInitialized()) return;

      socket.on("killUx", async (callback) => {
        try {
          await lcuHandlerFactory.getHeadHandler()?.killUx();

          callback(null, true);
        } catch (error) {
          console.error("Error occured in killUx event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to kill ux");
        }
      });

      socket.on("launchUx", async (callback) => {
        try {
          await lcuHandlerFactory.getHeadHandler()?.launchUx();

          callback(null, true);
        } catch (error) {
          console.error("Error occured in launchUx event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to launch ux");
        }
      });

      socket.on("refreshAccount", async (callback) => {
        try {
          await lcuHandlerFactory.refresh();

          const summonerData = await lcuHandlerFactory
            .getHeadHandler()!
            .getCurrentSummoner();
          callback(null, summonerData);
        } catch (error) {
          console.error("Error occured in refreshAccount event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to refresh account");
        }
      });

      socket.on("showEligibleLobbys", async (callback) => {
        try {
          const lobbysData = await lcuHandlerFactory
            .getLobbyHandler()!
            .showEligibleLobbys();

          callback(null, lobbysData);
        } catch (error) {
          console.error("Error occured in showEligibleLobbys event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get eligible lobbys");
        }
      });
      socket.on("createLobby", async ({ queueId }, callback) => {
        try {
          await lcuHandlerFactory.refresh();

          const lobbysData = await lcuHandlerFactory
            .getLobbyHandler()!
            .createLobby(queueId);

          callback(null, lobbysData);
        } catch (error) {
          console.error("Error occured in createLobby event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to create lobby");
        }
      });
      socket.on("createCustomLobby", async (data, callback) => {
        try {
          const lobbysData = await lcuHandlerFactory
            .getLobbyHandler()!
            .createCustomLobby(data);

          callback(null, lobbysData);
        } catch (error) {
          console.error("Error occured in createCustomLobby event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to create custom lobby");
        }
      });

      socket.on("leaveLobby", async (callback) => {
        try {
          await lcuHandlerFactory.getLobbyHandler()!.leaveLobby();

          callback(null, true);
        } catch (error) {
          console.error("Error occured in leaveLobby event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get leave the lobby");
        }
      });

      socket.on("changeRolePositionPreference", async (data, callback) => {
        try {
          const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
          await lobbyHandler.changePositionPreferences(data);

          const { localMember, members } = await lobbyHandler.getLobbyData();
          callback(null, { localMember, members });
        } catch (error) {
          console.error(
            "Error occured in changeRolePositionPreference event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to change position preference"
            );
        }
      });
      socket.on("getAvailableChampionsBots", async (callback) => {
        try {
          const botsData = await lcuHandlerFactory
            .getLobbyHandler()!
            .getAvailableChampionsBots();
          callback(null, botsData);
        } catch (error) {
          console.error(
            "Error occured in getAvailableChampionsBots event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to get available bot champions"
            );
        }
      });
      socket.on("startCustomChampSelect", async (callback) => {
        try {
          await lcuHandlerFactory.getLobbyHandler()!.startCustomChampSelect();

          callback(null, true);
        } catch (error) {
          console.error(
            "Error occured in startCustomChampSelect event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to start custom lobby");
        }
      });
      socket.on("addBotToCustomLobby", async (data, callback) => {
        try {
          const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
          await lobbyHandler.addBotsToCustomLobby(data);

          const {
            gameConfig: { customTeam100, customTeam200 }
          } = await lobbyHandler.getLobbyData();
          callback(null, { customTeam100, customTeam200 });
        } catch (error) {
          console.error("Error occured in addBotToCustomLobby event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to add bot to custom lobby"
            );
        }
      });
      socket.on("managePlayerInLobby", async (data, callback) => {
        try {
          const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
          await lobbyHandler.managePlayerInLobby(data);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in managePlayerInLobby event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to manage player in lobby");
        }
      });
      socket.on("removeExistingBotInCustomLobby", async (data, callback) => {
        try {
          const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;
          await lobbyHandler.removeExistingBotFromCustomLobby(data);

          callback(null, true);
        } catch (error) {
          console.error(
            "Error occured in removeExistingBotInCustomLobby event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to remove bot from lobby");
        }
      });
      socket.on("editExistingBotInCustomLobby", async (data, callback) => {
        try {
          const lobbyHandler = lcuHandlerFactory.getLobbyHandler()!;

          const championIdName = findChampionById(
            dragonChampionsData,
            data.championId
          )?.idName;

          if (!championIdName) return callback("Champion not found");

          await lobbyHandler.editExistingBotInCustomLobby(
            { botName: championIdName, teamId: data.teamId },
            data
          );

          callback(null, true);
        } catch (error) {
          console.error(
            "Error occured in editExistingBotInCustomLobby event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to edit bot in lobby");
        }
      });
      socket.on("searchMatch", async (callback) => {
        try {
          await lcuHandlerFactory.getLobbyHandler()?.searchMatch();

          callback(null, true);
        } catch (error) {
          console.error("Error occured in stopMatchmaking event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to stop the matchmaking");
        }
      });
      socket.on("stopMatchmaking", async (callback) => {
        try {
          await lcuHandlerFactory.getLobbyHandler()?.searchMatch(true);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in stopMatchmaking event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to stop the matchmaking");
        }
      });
      socket.on("reconnectToCurrentMatch", async (callback) => {
        try {
          await lcuHandlerFactory.getHeadHandler()?.reconnectToCurrentMatch();

          callback(null, true);
        } catch (error) {
          console.error(
            "Error occured in reconnectToCurrentMatch event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to reconnect to the current match"
            );
        }
      });
      socket.on("manageMatchReadyCheck", async (data, callback) => {
        try {
          await lcuHandlerFactory
            .getLobbyHandler()
            ?.manageMatchReadyCheck(data);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in manageMatchReadyCheck event.", error);
          if (error instanceof Error) callback(error.message);
          else callback(`An error occured while trying to ${data} the match`);
        }
      });
      socket.on("dismissStatsAfterMatch", async (callback) => {
        try {
          await lcuHandlerFactory.getHeadHandler()?.dismissStatsAfterMatch();

          callback(null, true);
        } catch (error) {
          console.error(
            "Error occured in dismissStatsAfterMatch event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to dissmis stats after match"
            );
        }
      });
      socket.on("getChampionSelectPhaseData", async (callback) => {
        try {
          const data = await lcuHandlerFactory
            .getChampionSelectHandler()
            ?.getChampionSelectPhaseData();

          callback(null, data);
        } catch (error) {
          console.error(
            "Error occured in getChampionSelectPhaseData event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to get champion select phase data"
            );
        }
      });
      socket.on("getChampionSelectSessionTimer", async (callback) => {
        try {
          const data = await lcuHandlerFactory
            .getChampionSelectHandler()
            ?.getChampSelectSessionTimer();

          callback(null, data);
        } catch (error) {
          console.error(
            "Error occured in getChampionSelectSessionTimer event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to get champion select session timer"
            );
        }
      });

      socket.on(
        "getChampionSelectSummonerCellId",
        async (summonerCellId, callback) => {
          try {
            const data = await lcuHandlerFactory
              .getChampionSelectHandler()
              ?.getChampionSelectSummonerCellId(summonerCellId);

            callback(null, data);
          } catch (error) {
            console.error(
              "Error occured in getChampionSelectSummonerCellId event.",
              error
            );
            if (error instanceof Error) callback(error.message);
            else
              callback(
                "An error occured while trying to get available champions for summoner"
              );
          }
        }
      );

      socket.on(
        "getAvailableChampsBySummonerId",
        async (summonerId, callback) => {
          try {
            const data = await lcuHandlerFactory
              .getHeadHandler()
              ?.getAvailableChampsBySummonerId(summonerId);

            callback(null, data);
          } catch (error) {
            console.error(
              "Error occured in getAvailableChampsBySummonerId event.",
              error
            );
            if (error instanceof Error) callback(error.message);
            else
              callback(
                "An error occured while trying to get available champions for summoner"
              );
          }
        }
      );
      socket.on("getAllChampionsIdsForChampSelect", async (callback) => {
        try {
          const championSelectHandler =
            lcuHandlerFactory.getChampionSelectHandler();

          if (!championSelectHandler)
            return callback("Champion Ids for champion select not found");

          const [bannable, pickable, disabled] = await Promise.all([
            championSelectHandler.getChampionsIdsForChampSelect(
              "bannable-champion-ids"
            ),
            championSelectHandler.getChampionsIdsForChampSelect(
              "pickable-champion-ids"
            ),
            championSelectHandler.getChampionsIdsForChampSelect(
              "disabled-champion-ids"
            )
          ]);

          callback(null, {
            bannable,
            pickable,
            disabled
          });
        } catch (error) {
          console.error(
            "Error occured in getAllChampionsIdsForChampSelect event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to get champions ids for champion select"
            );
        }
      });

      socket.on("champSelectAction", async (data, callback) => {
        try {
          const championSelectHandler =
            lcuHandlerFactory.getChampionSelectHandler();

          await championSelectHandler?.champSelectAction(data);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in champSelectAction event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to take a action in champion select"
            );
        }
      });
      socket.on("getChampionsData", async (callback) => {
        try {
          callback(null, dragonChampionsData);
        } catch (error) {
          console.error("Error occured in getChampionsData event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get champions data");
        }
      });
      socket.on("createRunePage", async (data, callback) => {
        try {
          const createdRune = await lcuHandlerFactory
            .getHeadHandler()
            ?.createRunePage(data);

          if (!createdRune) return callback("Couldn't create rune page");

          callback(null, createdRune);
        } catch (error) {
          console.error("Error occured in createRunePage event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to create rune page");
        }
      });
      socket.on("setCurrentRunePage", async (runePageId, callback) => {
        try {
          await lcuHandlerFactory.getHeadHandler()?.setCurrentPage(runePageId);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in setCurrentRunePage event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to set current rune page");
        }
      });
      socket.on("getCurrentRunePage", async (callback) => {
        try {
          const currentRunePage = await lcuHandlerFactory
            .getHeadHandler()
            ?.getCurrentPage();

          if (!currentRunePage)
            return callback("Couldn't get current rune page");

          callback(null, currentRunePage);
        } catch (error) {
          console.error("Error occured in getCurrentRunePage event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback("An error occured while trying to get current rune page");
        }
      });
      socket.on("getOwnedRunePageCount", async (callback) => {
        try {
          const currentRunePage = await lcuHandlerFactory
            .getHeadHandler()
            ?.getOwnedRunePageCount();

          if (!currentRunePage)
            return callback("Couldn't get owner rune page count");

          callback(null, currentRunePage);
        } catch (error) {
          console.error("Error occured in getOwnedRunePageCount event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to get owner rune pages count"
            );
        }
      });
      socket.on("editRunePageById", async (data, callback) => {
        try {
          await lcuHandlerFactory
            .getHeadHandler()
            ?.editRunePageById(data.pageId, data.updateData);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in editRunePageById event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to edit rune page");
        }
      });
      socket.on("deleteRunePageById", async (pageId, callback) => {
        try {
          await lcuHandlerFactory.getHeadHandler()?.deleteRunePageById(pageId);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in deleteRunePageById event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to delete rune page");
        }
      });
      socket.on(
        "getRecommendedPagesByChampIdPositionAndMapId",
        async (data, callback) => {
          try {
            const recommendedRunePages = await lcuHandlerFactory
              .getHeadHandler()
              ?.getRecommendedPagesByChampIdPositionAndMapId(data);

            callback(
              !recommendedRunePages ? "Couldn't get recommended runes" : null,
              recommendedRunePages
            );
          } catch (error) {
            console.error(
              "Error occured in getRecommendedPagesByChampIdPositionAndMapId event.",
              error
            );
            if (error instanceof Error) callback(error.message);
            else
              callback(
                "An error occured while trying to get recommended rune pages for your champion"
              );
          }
        }
      );
      socket.on("getHeadRunesData", async (callback) => {
        try {
          const headRunesData = getDragonHeadRunesData();

          callback(null, headRunesData);
        } catch (error) {
          console.error("Error occured in getHeadRunesData event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get head runes data");
        }
      });
      socket.on("getRunesData", async (callback) => {
        try {
          const headRunesData = getDragonRunesData();

          callback(null, headRunesData);
        } catch (error) {
          console.error("Error occured in getRunesData event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get runes data");
        }
      });
      socket.on("getSummonerSpellsData", async (callback) => {
        try {
          callback(null, dragonSpellsData);
        } catch (error) {
          console.error("Error occured in getSummonerSpellsData event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to get summoners spells data"
            );
        }
      });
      socket.on("changeSummonerSpells", async (data, callback) => {
        try {
          await lcuHandlerFactory
            .getChampionSelectHandler()
            ?.changeSummonerSpells(data);

          callback(null, true);
        } catch (error) {
          console.error("Error occured in changeSummonerSpells event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to change summoners spells"
            );
        }
      });
      socket.on("getCurrentFriendsList", async (callback) => {
        try {
          const friendsList = await lcuHandlerFactory
            .getSocialHandler()
            ?.getCurrentFriendsList();

          callback(
            !friendsList ? "Couldn't get friends list" : null,
            friendsList
          );
        } catch (error) {
          console.error("Error occured in getCurrentFriendsList event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get friend list");
        }
      });
      socket.on("manageInvitationToLobby", async (data, callback) => {
        try {
          await lcuHandlerFactory.getLobbyHandler()?.manageInvitation(data);

          callback(null, true);
        } catch (error) {
          console.error(
            "Error occured in manageInvitationToLobby event.",
            error
          );
          if (error instanceof Error) callback(error.message);
          else
            callback(
              `An error occured while trying to ${data.action} invitation`
            );
        }
      });
      socket.on("getQueuesData", async (callback) => {
        try {
          //TODO: change to download folder <-
          callback(null, queues);
        } catch (error) {
          console.error("Error occured in getQueuesData event.", error);
          if (error instanceof Error) callback(error.message);
          else callback("An error occured while trying to get friend list");
        }
      });
      socket.on("invitePlayerToLobby", async (data, callback) => {
        try {
          await lcuHandlerFactory.getLobbyHandler()?.invitePlayerToLobby(data);
          callback(null, true);
        } catch (error) {
          console.error("Error occured in invitePlayerToLobby event.", error);
          if (error instanceof Error) callback(error.message);
          else
            callback(
              "An error occured while trying to invite player(s) to lobby"
            );
        }
      });
    }
  );
}
