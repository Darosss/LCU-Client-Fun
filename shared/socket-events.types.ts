import {
  AddBotToLobbyBody,
  ChampSelectActionParams,
  ChampSelectSessionDataRequiredWithActionsFlat,
  ChampSelectSessionTimerResponse,
  ChampSelectSummonerData,
  ChampionBotsData,
  ChampionData,
  ChangePositionPreferenceBody,
  ChangeSummonersSpellsBody,
  ClientOptions,
  CreateCustomLobbyOpts,
  CreateRunePageBody,
  CurrentSummonerData,
  DataDragonChampionsJsonFileData,
  DataDragonSpellsJsonFileData,
  EligibileLobby,
  FriendsListData,
  GameFlowPhaseData,
  GetAvailableChampionsIdsForChampSelectType,
  GetRecommendedPagesByChampIdPositionAndMapIdParams,
  HeadRuneData,
  InvitePlayerToLobbyBody,
  LobbyGameDataResponse,
  ManageBotInCustomLobbyOpts,
  ManageInvitationParams,
  ManagePlayerInLobbyOpts,
  ManageReadyCheckMatchActions,
  MatchmakingSearchData,
  OwnedRunePageCountData,
  QueueData,
  ReceivedInvitationData,
  RecommendedRunesData,
  RunePageData,
  RunesData,
} from ".";

type CallbackType<CBData, Error = unknown> = (
  error: null | Error,
  data?: CBData
) => void;

type CreateLobbyData = {
  queueId: number;
};

type ChampionSelectSummonerDataType = {
  summonerCellId: number;
  data: ChampSelectSummonerData;
};

type CreateCustomLobbyData = CreateCustomLobbyOpts & {};

type EditRunePageByIdData = {
  pageId: number;
  updateData: RunePageData;
};

export type ServerToClientEvents = {
  gameflowPhase: (data: GameFlowPhaseData) => void;
  lobbyData: (data: LobbyGameDataResponse | null) => void;
  currentSummoner: (data: CurrentSummonerData) => void;
  forceRefresh: () => void;
  matchmakingSearch: (data: MatchmakingSearchData) => void;
  clientOptions: (data: ClientOptions) => void;
  championSelectPhase: (
    data: ChampSelectSessionDataRequiredWithActionsFlat
  ) => void;
  championSelectSummonerData: (data: ChampionSelectSummonerDataType) => void;
  receivedInvitation: (data: ReceivedInvitationData[]) => void;
};

export type ClientToServerEvents = {
  refreshAccount: (cb: CallbackType<CurrentSummonerData, string>) => void;
  showEligibleLobbys: (cb: CallbackType<EligibileLobby[], string>) => void;
  createLobby: (
    data: CreateLobbyData,
    cb: CallbackType<LobbyGameDataResponse, string>
  ) => void;
  changeClientOptions: (
    data: Partial<ClientOptions>,
    cb: CallbackType<ClientOptions, string>
  ) => void;

  killUx: (cb: CallbackType<boolean, string>) => void;
  launchUx: (cb: CallbackType<boolean, string>) => void;

  createCustomLobby: (
    data: CreateCustomLobbyData,
    cb: CallbackType<LobbyGameDataResponse, string>
  ) => void;
  searchMatch: (cb: CallbackType<boolean, string>) => void;

  leaveLobby: (cb: CallbackType<boolean, string>) => void;
  changeRolePositionPreference: (
    data: ChangePositionPreferenceBody,
    cb: CallbackType<
      Pick<LobbyGameDataResponse, "localMember" | "members">,
      string
    >
  ) => void;
  getAvailableChampionsBots: (
    cb: CallbackType<ChampionBotsData[], string>
  ) => void;
  startCustomChampSelect: (cb: CallbackType<boolean, string>) => void;

  managePlayerInLobby: (
    data: ManagePlayerInLobbyOpts,
    cb: CallbackType<boolean, string>
  ) => void;

  editExistingBotInCustomLobby: (
    data: AddBotToLobbyBody,
    cb: CallbackType<boolean, string>
  ) => void;
  removeExistingBotInCustomLobby: (
    data: ManageBotInCustomLobbyOpts,
    cb: CallbackType<boolean, string>
  ) => void;

  addBotToCustomLobby: (
    data: AddBotToLobbyBody,
    cb: CallbackType<
      Pick<
        LobbyGameDataResponse["gameConfig"],
        "customTeam100" | "customTeam200"
      >,
      string
    >
  ) => void;

  stopMatchmaking: (cb: CallbackType<boolean, string>) => void;
  reconnectToCurrentMatch: (cb: CallbackType<boolean, string>) => void;

  manageMatchReadyCheck: (
    data: ManageReadyCheckMatchActions,
    cb: CallbackType<boolean, string>
  ) => void;
  dismissStatsAfterMatch: (cb: CallbackType<boolean, string>) => void;
  getChampionSelectPhaseData: (
    cb: CallbackType<ChampSelectSessionDataRequiredWithActionsFlat, string>
  ) => void;
  getChampionSelectSessionTimer: (
    cb: CallbackType<ChampSelectSessionTimerResponse, string>
  ) => void;

  getChampionSelectSummonerCellId: (
    summonerCellId: number,
    cb: CallbackType<ChampSelectSummonerData, string>
  ) => void;
  getAvailableChampsBySummonerId: (
    summonerId: number,
    cb: CallbackType<ChampionData[], string>
  ) => void;

  getAllChampionsIdsForChampSelect: (
    cb: CallbackType<GetAvailableChampionsIdsForChampSelectType, string>
  ) => void;

  champSelectAction: (
    data: ChampSelectActionParams,
    cb: CallbackType<boolean, string>
  ) => void;

  getChampionsData: (
    cb: CallbackType<DataDragonChampionsJsonFileData[], string>
  ) => void;

  getQueuesData: (cb: CallbackType<QueueData[], string>) => void;

  createRunePage: (
    data: CreateRunePageBody,
    cb: CallbackType<RunePageData, string>
  ) => void;

  setCurrentRunePage: (
    pageId: number,
    cb: CallbackType<boolean, string>
  ) => void;
  getCurrentRunePage: (cb: CallbackType<RunePageData, string>) => void;
  getOwnedRunePageCount: (
    cb: CallbackType<OwnedRunePageCountData, string>
  ) => void;

  editRunePageById: (
    data: EditRunePageByIdData,
    cb: CallbackType<boolean, string>
  ) => void;
  deleteRunePageById: (
    pageId: number,
    cb: CallbackType<boolean, string>
  ) => void;

  getRecommendedPagesByChampIdPositionAndMapId: (
    data: GetRecommendedPagesByChampIdPositionAndMapIdParams,
    cb: CallbackType<RecommendedRunesData[], string>
  ) => void;

  getHeadRunesData: (cb: CallbackType<HeadRuneData[], string>) => void;
  getRunesData: (cb: CallbackType<RunesData[], string>) => void;
  getSummonerSpellsData: (
    cb: CallbackType<DataDragonSpellsJsonFileData[], string>
  ) => void;

  changeSummonerSpells: (
    data: ChangeSummonersSpellsBody,
    cb: CallbackType<boolean, string>
  ) => void;

  getCurrentFriendsList: (cb: CallbackType<FriendsListData[], string>) => void;
  manageInvitationToLobby: (
    data: ManageInvitationParams,
    cb: CallbackType<boolean, string>
  ) => void;

  invitePlayerToLobby: (
    data: InvitePlayerToLobbyBody[],
    cb: CallbackType<boolean, string>
  ) => void;
};
