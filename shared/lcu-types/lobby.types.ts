import { BotDifficulty } from "../lcu-enums";
import { PositionsPreferences } from "../lcu-enums/lobby.enums";

export type ManageInvitationAction = "accept" | "decline";

export interface ManageInvitationParams {
  action: ManageInvitationAction;
  invitationId: string;
}

export interface LobbyGameDataResponse {
  canStartActivity: boolean;
  gameConfig: LobbyGameConfig;
  //TODO: change any in needed / required data
  invitations: LobbyInvitationData[];
  localMember: LobbyMember;
  members: LobbyMember[];
  mucJwtDto: any;
  multiUserChatId: any;
  multiUserChatPassword: any;
  partyId: any;
  partyType: any;
  restrictions: any;
  scarcePositions: any;
  warnings: any;
}

export interface LobbyInvitationData {
  invitationId?: string;
  invitationType?: unknown;
  state: InvitationState;
  timestamp: number;
  toSummonerId: number;
  toSummonerName: string;
}

export interface LobbyGameConfig {
  allowablePremadeSizes: number[];
  customLobbyName: string;
  customMutatorName: string;
  customRewardsDisabledReasons: [];
  customSpectatorPolicy: string;
  customSpectators: [];
  customTeam100: LobbyMember[];
  customTeam200: LobbyMember[];
  gameMode: string;
  isCustom: boolean;
  isLobbyFull: boolean;
  isTeamBuilderManaged: boolean;
  mapId: number;
  maxHumanPlayers: number;
  maxLobbySize: number;
  maxTeamSize: number;
  pickType: string;
  premadeSizeAllowed: boolean;
  queueId: number;
  shouldForceScarcePositionSelection: boolean;
  showPositionSelector: boolean;
  showQuickPlaySlotSelection: boolean;
}

export interface LobbyMember {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: BotDifficulty;
  botId: string;
  firstPositionPreference: PositionsPreferences;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  playerSlots: [];
  puuid: string;
  ready: boolean;
  secondPositionPreference: PositionsPreferences;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

export type InvitationState = "Requested" | "Declined" | "Pending" | "Accepted";

export interface InvitePlayerToLobbyBody {
  toSummonerId: number;
}

export interface ReceivedInvitationData {
  canAcceptInvitation: boolean;
  fromSummonerId: number;
  fromSummonerName: string;
  gameConfig: {
    gameMode: string;
    inviteGameType: string;
    mapId: number;
    queueId: number;
  };
  invitationId: string;
  restrictions: [
    {
      expiredTimestamp: number;
      restrictionArgs: unknown;
      restrictionCode: string;
      summonerIds: number[];
      summonerIdsString: string;
    }
  ];
  state: InvitationState;
  timestamp: string;
}

export interface ChangePositionPreferenceBody {
  firstPreference: PositionsPreferences;
  secondPreference: PositionsPreferences;
}

export interface EligibileLobby {
  eligible: boolean;
  queueId: number;
  restrictions: any;
}

export type EligibileLobbyAndQueueData = Partial<EligibileLobby> &
  Partial<QueueData>;

export interface QueueData {
  queueId: number;
  map: string;
  description: null | string;
  notes: null | string;
}

export type ManageReadyCheckMatchActions = "accept" | "decline";

export interface MatchmakingSearchData {
  dodgeData: MatchmakingSearchDodgeData;
  errors: unknown[];
  estimatedQueueTime: number;
  isCurrentlyInQueue: boolean;
  lobbyId: string;
  lowPriorityData: MatchmakingSearchLowPriorityData;
  queueId: number;
  readyCheck: MatchmakingSearchReadyCheck;
  searchState: string; // probably Search, wait for ban time etc.
  timeInQueue: number;
}

interface MatchmakingSearchDodgeData {
  dodgerId: number;
  state: string;
}
interface MatchmakingSearchLowPriorityData {
  bustedLeaverAccessToken: string;
  penalizedSummonerIds: number[];
  penaltyTime: number;
  penaltyTimeRemaining: number;
  reason: string;
}
interface MatchmakingSearchReadyCheck {
  declinerIds: number[];
  dodgeWarning: string;
  playerResponse: string;
  state: string;
  suppressUx: boolean;
  timer: number;
}
