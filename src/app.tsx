import React, { useContext } from "react";
import { Window, hot, View } from "@nodegui/react-nodegui";
import { LCUContext, LCUContextProvider } from "@lcu";
import { PhaseView } from "@components";
import { appStylesheet } from "@styles";

function App() {
  const { options } = useContext(LCUContext);

  return (
    <LCUContextProvider>
      <Window
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
