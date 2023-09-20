import React, { useContext, useState } from "react";
import { Image, View } from "@nodegui/react-nodegui";
import { ChampionData, LCUContext } from "@lcu";
import { SelectedChamp } from "./types";
import { ChampionSelectContext } from "./champion-select-context";
import {
  dataFileExists,
  getPercentFromValue,
  isBannedOrPickedChamp,
} from "@helpers";
import {
  DangerButton,
  InfoButton,
  InfoText,
  PrimaryButton,
  PrimaryLineEdit,
  PrimaryText,
} from "@components";
import path from "path";
import { AspectRatioMode, WidgetEventTypes } from "@nodegui/nodegui";
import nullChampion from "@assets/null-champion.png";

//TODO: refactor AvailableChamps.tsx
interface AvailableChampsProps {
  banPhase: boolean;
  currentActionId?: number;
  onChangeChampion: (champ: SelectedChamp) => void;
}

interface AvailableChampions {
  banChampions: number[];
  pickChampions: number[];
  disabledChampions: number[];
}

export function AvailableChamps({
  banPhase,
  currentActionId,
  onChangeChampion,
}: AvailableChampsProps) {
  const { currentSummoner, headLCUHandler } = useContext(LCUContext);

  const {
    champSelectLCUHandler,
    champSelectSessionData: { myTeam, bans, theirTeam },
    availableChamps,
    setAvailableChamps,
  } = useContext(ChampionSelectContext);
  const [champFilter, setChampFilter] = useState<string | null>(null);
  const [showImages, setShowImages] = useState(true);

  const [pickableChamps, setPickableChamps] = useState<AvailableChampions>({
    banChampions: [],
    pickChampions: [],
    disabledChampions: [],
  });

  React.useEffect(() => {
    if (!currentSummoner || !headLCUHandler) return;
    headLCUHandler
      .getAvailableChampsBySummonerId(currentSummoner.summonerId)
      .then((availableChamps) => {
        setAvailableChamps(availableChamps);
      })
      .catch((err) =>
        console.log("Error occured while getting available champions", err)
      );
  }, [currentSummoner, headLCUHandler]);

  React.useEffect(() => {
    if (availableChamps.length <= 0 || !champSelectLCUHandler) return;

    const getPickableChampsData = async () => {
      return [
        await champSelectLCUHandler.getChampionsIdsForChampSelect(
          "pickable-champion-ids"
        ),
        await champSelectLCUHandler.getChampionsIdsForChampSelect(
          "disabled-champion-ids"
        ),
        await champSelectLCUHandler.getChampionsIdsForChampSelect(
          "bannable-champion-ids"
        ),
      ];
    };

    getPickableChampsData().then(
      ([pickableChamps, disabledChamps, bannableChamps]) => {
        setPickableChamps({
          pickChampions: pickableChamps,
          banChampions: bannableChamps,
          disabledChampions: disabledChamps,
        });
      }
    );
  }, [availableChamps, champSelectLCUHandler]);

  function handleOnClickChampionBlock(
    champId: number,
    actionId: number,
    champName: string
  ) {
    champSelectLCUHandler
      ?.champSelectAction({
        championId: champId,
        actionId: actionId,
      })
      .then(() => {
        onChangeChampion({ id: champId, name: champName });
      })
      .catch((err) =>
        console.log(
          `Error occured while invoking champSelectAction function`,
          err
        )
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

  return (
    <View id="available-champs-wrapper">
      <View id="available-champs-search">
        <PrimaryText text="Search champion" />
        <PrimaryLineEdit
          on={{
            textChanged: (e) => setChampFilter(e.toLowerCase()),
          }}
          text={champFilter || ""}
        />
        {showImages ? (
          <InfoButton
            text="Text"
            on={{ clicked: () => setShowImages(false) }}
          />
        ) : (
          <InfoButton
            text="Images"
            on={{ clicked: () => setShowImages(true) }}
          />
        )}
      </View>

      <View id="available-champs">
        {availableChamps
          .filter(({ id, name }) => {
            if (!banPhase && !pickableChamps.pickChampions.includes(id)) return;
            else if (banPhase && !pickableChamps.banChampions.includes(id))
              return;
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
              onClickChampionBtn={() =>
                currentActionId
                  ? handleOnClickChampionBlock(
                      champ.id,
                      currentActionId,
                      champ.name
                    )
                  : null
              }
              image={showImages}
            />
          ))}
      </View>
    </View>
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
  const {
    options: {
      minSize: { width },
    },
  } = useContext(LCUContext);

  if (image) {
    const imgPath = path.join(__dirname, squarePortraitPath);
    const widthAndHeightImg = ~~getPercentFromValue(width, 5);
    return (
      <View
        id="available-champs-images-wrapper"
        style={`${disabled ? "background:red;" : ""}`}
      >
        <InfoText text={name} />
        <Image
          id="champ-image"
          src={dataFileExists(squarePortraitPath) ? imgPath : nullChampion}
          aspectRatioMode={AspectRatioMode.KeepAspectRatio}
          minSize={{ width: widthAndHeightImg, height: widthAndHeightImg }}
          maxSize={{ width: widthAndHeightImg, height: widthAndHeightImg }}
          on={{
            [WidgetEventTypes.MouseButtonPress]: () =>
              !disabled ? onClickChampionBtn() : null,
          }}
        />
      </View>
    );
  }

  return disabled ? (
    <DangerButton text={name} />
  ) : (
    <PrimaryButton
      text={name}
      on={{
        clicked: () => onClickChampionBtn(),
      }}
    />
  );
}
