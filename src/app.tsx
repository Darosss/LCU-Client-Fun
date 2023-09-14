import React, { useContext } from "react";
import { Window, hot, View } from "@nodegui/react-nodegui";
import { QIcon } from "@nodegui/nodegui";
import nodeguiIcon from "@assets/nodegui.jpg";
import { LCUContext, LCUContextProvider } from "@lcu";
import { PhaseView } from "@components";
import { appStylesheet } from "@styles";

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
        <View
          id="main-app"
          styleSheet={appStylesheet(
            options.minSize.width,
            options.minSize.height
          )}
        >
          <PhaseView />
        </View>
      </Window>
    </LCUContextProvider>
  );
}

export default hot(App);
