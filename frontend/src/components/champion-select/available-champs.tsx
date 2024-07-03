import React, { useState } from "react";
import path from "path";
import Image from "next/image";
import { SelectedChamp } from "./types";
import { Button, useHeadContext } from "@/components";
import {
  ChampionData,
  GetAvailableChampionsIdsForChampSelectType,
  isBannedOrPickedChamp,
} from "@/shared";
import { useChampionSelectContext } from "./champion-select-context";
import { useSocketEventsContext } from "@/socket";
import { toast } from "react-toastify";
import styles from "./availble-champs.module.scss";

//TODO: refactor AvailableChamps.tsx
interface AvailableChampsProps {
  banPhase: boolean;
  currentActionId?: number;
  onChangeChampion: (champ: SelectedChamp) => void;
}

export function AvailableChamps({
  banPhase,
  currentActionId,
  onChangeChampion,
}: AvailableChampsProps) {
  const { emits } = useSocketEventsContext();
  const {
    currentSummonerState: [currentSummoner],
    options: {
      championSelect: { showImages },
    },
    changeClientOptions,
  } = useHeadContext();

  const {
    champSelectSessionData: { myTeam, bans, theirTeam },
    availableChamps,
    setAvailableChamps,
  } = useChampionSelectContext();
  const [champFilter, setChampFilter] = useState<string | null>(null);

  const [pickableChamps, setPickableChamps] =
    useState<GetAvailableChampionsIdsForChampSelectType>({
      bannable: [],
      pickable: [],
      disabled: [],
    });

  React.useEffect(() => {
    if (!currentSummoner?.summonerId) return;

    emits.getAvailableChampsBySummonerId(
      currentSummoner?.summonerId,
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't find champions data");

        setAvailableChamps(data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSummoner?.summonerId, emits]);

  React.useEffect(() => {
    if (availableChamps.length <= 0) return;

    emits.getAllChampionsIdsForChampSelect((error, data) => {
      if (error || !data) return toast.error(error);

      setPickableChamps(data);
    });
  }, [availableChamps, emits]);

  function handleOnClickChampionBlock(
    champId: number,
    actionId: number,
    champName: string
  ) {
    emits.champSelectAction(
      { championId: champId, actionId: actionId },
      (error, data) => {
        if (error || !data)
          return toast.error(error || "Couldn't make an action");

        onChangeChampion({ id: champId, name: champName });
      }
    );
  }

  function isBannedOrPickedChampByIdWrapped(championId: number) {
    return isBannedOrPickedChamp(championId, Object.assign(myTeam, theirTeam), [
      ...bans.myTeamBans,
      ...bans.theirTeamBans,
    ]);
  }

  function sortChampionsAlphabeticaly(name1: string, name2: string) {
    if (name1 < name2) return -1;
    if (name1 >= name2) return 1;
    return 0;
  }

  function handleOnClickShowImages(show: boolean) {
    changeClientOptions({ championSelect: { showImages: show } });
  }

  return (
    <div className={styles.availableChampsWraper}>
      <div className={styles.championsFilters}>
        <div>Search champion</div>
        <input
          onChange={(e) => setChampFilter(e.target.value.toLowerCase())}
          value={champFilter || ""}
        />
        {showImages ? (
          <Button onClick={() => handleOnClickShowImages(false)}>Text</Button>
        ) : (
          <Button onClick={() => handleOnClickShowImages(true)}>Images</Button>
        )}
      </div>

      <div className={styles.championsList}>
        {availableChamps
          .filter(({ id, name }) => {
            if (!banPhase && !pickableChamps.pickable.includes(id)) return;
            else if (banPhase && !pickableChamps.bannable.includes(id)) return;
            else if (champFilter)
              return name.toLowerCase().includes(champFilter.toLowerCase());
            return true;
          })
          .sort((a, b) => sortChampionsAlphabeticaly(a.name, b.name))
          .map((champ, idx) => (
            <ChampionBtnBlock
              key={idx}
              champData={champ}
              disabled={isBannedOrPickedChampByIdWrapped(champ.id)}
              onClickChampionBtn={() => {
                currentActionId
                  ? handleOnClickChampionBlock(
                      champ.id,
                      currentActionId,
                      champ.name
                    )
                  : null;
              }}
              image={showImages}
            />
          ))}
      </div>
    </div>
  );
}

interface ChampionBtnProps {
  disabled: boolean;
  champData: ChampionData;
  image: boolean;
  onClickChampionBtn: () => void;
}

function ChampionBtnBlock({
  champData: { id, squarePortraitPath, name },
  disabled = false,
  image = false,
  onClickChampionBtn,
}: ChampionBtnProps): JSX.Element {
  if (image) {
    const imgPath = path.join(
      process.env.NEXT_PUBLIC_BACKEND_URL,
      process.env.NEXT_PUBLIC_BACKEND_PUBLIC,
      squarePortraitPath
    );
    return (
      <div
        className={`${styles.championBtnImageWrapper} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <div className={styles.imageHolder}>
          <Image
            id="champ-image"
            src={imgPath}
            alt={name}
            sizes="9vmin"
            fill
            onClick={() => (!disabled ? onClickChampionBtn() : null)}
          />
        </div>
        <div className={styles.nameHolder}>{name}</div>
      </div>
    );
  }

  return (
    <div className={styles.championBtnTextWrapper}>
      {disabled ? (
        <Button defaultButtonType="secondary" disabledButton={true}>
          {name}
        </Button>
      ) : (
        <Button
          defaultButtonType="primary"
          onClick={() => onClickChampionBtn()}
        >
          {name}
        </Button>
      )}
    </div>
  );
}
