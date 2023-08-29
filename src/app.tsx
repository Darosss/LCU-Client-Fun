import { Window, hot, View } from "@nodegui/react-nodegui";
import React, { useContext } from "react";
import { QIcon } from "@nodegui/nodegui";
import nodeguiIcon from "../assets/nodegui.jpg";
import { backgroundLinearGradient } from "./components/styles";
import { LCUContext, LCUContextProvider } from "./LCU/lcucontext";
import { PhaseView } from "./components/phaseview";
import { ChangeOptions } from "./components/options";

const winIcon = new QIcon(nodeguiIcon);

function App() {
  const { options } = useContext(LCUContext);

  return (
    <LCUContextProvider>
      <Window
        windowIcon={winIcon}
        windowTitle="LCU Client"
        minSize={options.minSize}
        maxSize={options.minSize}
      >
        <View id="main-app" style={containerStyle}>
          <ChangeOptions />
          <PhaseView />
        </View>
      </Window>
    </LCUContextProvider>
  );
}

const containerStyle = `
  flex:1; 
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
  width:720px;

`;

export default hot(App);
