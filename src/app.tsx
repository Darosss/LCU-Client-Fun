import { Window, hot, View } from "@nodegui/react-nodegui";
import React from "react";
import { QIcon } from "@nodegui/nodegui";
import nodeguiIcon from "../assets/nodegui.jpg";
import { backgroundLinearGradient } from "./components/styles";
import { LCUContextProvider } from "./LCU/lcucontext";
import { PhaseView } from "./components/phaseview";
import { ChangeOptions } from "./components/options";

const minSize = { width: 720, height: 520 };
const winIcon = new QIcon(nodeguiIcon);

class App extends React.Component {
  render() {
    return (
      <LCUContextProvider>
        <Window
          windowIcon={winIcon}
          windowTitle="LCU Client"
          minSize={minSize}
          styleSheet={styleSheet}
        >
          <View style={containerStyle}>
            <ChangeOptions />
            <PhaseView />
          </View>
        </Window>
      </LCUContextProvider>
    );
  }
}

const containerStyle = `
  flex: 1; 
  ${backgroundLinearGradient("rgba(25,0,36,0.6)", "rgba(43,52,136,0.7)")}
`;

const styleSheet = `
  #welcome-text {
   
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }

  #step-1, #step-2 {
    font-size: 18px;
    padding-top: 10px;
    padding-horizontal: 20px;
  }
`;

export default hot(App);
