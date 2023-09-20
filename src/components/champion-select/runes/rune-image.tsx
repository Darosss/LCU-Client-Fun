import React from "react";
import { View, Image } from "@nodegui/react-nodegui";
import path from "path";
import {
  AspectRatioMode,
  WidgetEventTypes,
  QMouseEvent,
} from "@nodegui/nodegui";
import { MouseButton } from "@lcu";
import { successLinearGradient } from "@styles";

/**
 * - choosenCondition - add style to View if condition === true
 * - imgSrc - simple not absolute src image
 * - choosenConditionBgColor - color for choosenCondition. default=green
 * - minMaxSize - sets min and max size of image. default = 40, 40
 */

interface RuneImageProps {
  choosenCondition: boolean;
  imgSrc: string;
  choosenConditionStyle?: string;
  minMaxSize?: { width: number; height: number };
  onClickImg?: (btn: MouseButton) => void;
}

export function RuneImage({
  choosenCondition,
  imgSrc,
  choosenConditionStyle = successLinearGradient,
  minMaxSize,
  onClickImg,
}: RuneImageProps) {
  return (
    <View
      id="rune-image-wrapper"
      style={`${choosenCondition ? choosenConditionStyle : ""}`}
      on={{
        [WidgetEventTypes.MouseButtonPress]: (e: any) => {
          if (!onClickImg) return;
          const mouseEvt = new QMouseEvent(e);

          const mouseBtn = mouseEvt.button();
          const mouseBtnString =
            mouseBtn === 1
              ? MouseButton.LEFT
              : mouseBtn === 2
              ? MouseButton.RIGHT
              : MouseButton.SCROLL;

          onClickImg(mouseBtnString);
        },
      }}
    >
      <Image
        id="rune-image"
        src={path.join(__dirname, imgSrc)}
        minSize={{
          width: minMaxSize?.width || 40,
          height: minMaxSize?.height || 40,
        }}
        maxSize={{
          width: minMaxSize?.width || 40,
          height: minMaxSize?.height || 40,
        }}
        aspectRatioMode={AspectRatioMode.KeepAspectRatio}
      />
    </View>
  );
}
