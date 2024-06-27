import React from "react";
import path from "path";

import Image from "next/image";
import { MouseButton } from "@/shared";

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
  choosenConditionStyle,
  minMaxSize,
  onClickImg,
}: RuneImageProps) {
  console.log(
    process.env.NEXT_PUBLIC_BACKEND_URL,
    process.env.NEXT_PUBLIC_BACKEND_PUBLIC
  );
  return (
    <div
      id="rune-image-wrapper"
      // style={{}} ${choosenCondition ? choosenConditionStyle : ""} //TODO: add choosenConditionColor
      onClick={(e) => {
        if (!onClickImg) return;
        const mouseBtn = e.nativeEvent.button;
        const mouseBtnString =
          mouseBtn === 1
            ? MouseButton.LEFT
            : mouseBtn === 2
            ? MouseButton.RIGHT
            : MouseButton.SCROLL;

        onClickImg(mouseBtnString);
      }}
    >
      <Image
        id="rune-image"
        src={path.join(
          process.env.NEXT_PUBLIC_BACKEND_URL,
          process.env.NEXT_PUBLIC_BACKEND_PUBLIC,
          imgSrc
        )}
        width={minMaxSize?.width || 40}
        height={minMaxSize?.height || 40}
        alt="rune"
      />
    </div>
  );
}
