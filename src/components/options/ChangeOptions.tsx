import React, { useContext, useState } from "react";
import { Button, View } from "@nodegui/react-nodegui";
import { backgroundLinearGradient, defaultButton } from "../styles";
import { LCUContext } from "../../LCU/lcucontext";

export function ChangeOptions() {
  const { options, changeOptions } = useContext(LCUContext);
  const [showed, setShowed] = useState(false);

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
          style={`${
            options.autoAccept ? `background:'green'` : `background:'red';`
          }`}
          text={`Auto accept:  ${options.autoAccept}`}
          on={{
            clicked: () => changeOptions({ autoAccept: !options.autoAccept }),
          }}
        ></Button>
      </View>
    </View>
  );
}

const optionsMenuStyle = `
    ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(120,52,136,0.7)")}
    flex-direction:'row';
`;
