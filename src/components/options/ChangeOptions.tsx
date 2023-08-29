import React, { useContext, useState } from "react";
import { Button, LineEdit, Text, View } from "@nodegui/react-nodegui";
import { backgroundLinearGradient, defaultButton } from "../styles";
import { LCUContext } from "../../LCU/lcucontext";

export function ChangeOptions() {
  const {
    options: { autoAccept, minSize },
    changeOptions,
  } = useContext(LCUContext);
  const [showed, setShowed] = useState(false);
  const [localSizesWindow, setLocalSizesWindow] = useState<{
    width: number;
    height: number;
  }>({ width: minSize.width, height: minSize.height });
  return (
    <View>
      <Button
        style={defaultButton}
        text={"Change options"}
        on={{
          clicked: () => setShowed(!showed),
        }}
      ></Button>
      <View
        style={`${
          showed ? `display:'flex'; ` : `display:'none';`
        } ${optionsMenuStyle}`}
      >
        <Button
          style={`${autoAccept ? `background:'green'` : `background:'red';`}`}
          text={`Auto accept:  ${autoAccept}`}
          on={{
            clicked: () => changeOptions({ autoAccept: !autoAccept }),
          }}
        ></Button>
        <View>
          <Text>Client width:</Text>
          <LineEdit
            text={`${localSizesWindow.width}`}
            on={{
              textChanged: (value) => {
                if (isNaN(Number(value))) return;
                setLocalSizesWindow((prevState) => ({
                  ...prevState,
                  width: Number(value),
                }));
              },
            }}
          />
          <Text>Client height:</Text>
          <LineEdit
            text={`${localSizesWindow.height}`}
            on={{
              textChanged: (value) => {
                if (isNaN(Number(value))) return;
                setLocalSizesWindow((prevState) => ({
                  ...prevState,
                  height: Number(value),
                }));
              },
            }}
          />
          <Button
            on={{
              clicked: () => {
                changeOptions({ minSize: localSizesWindow });
              },
            }}
            text="Apply"
          />
        </View>
      </View>
    </View>
  );
}

const optionsMenuStyle = `
    ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(120,52,136,0.7)")}
    flex-direction:'row';
`;
