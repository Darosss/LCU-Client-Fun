import React from "react";
import path from "path";

import Image from "next/image";
import { MouseButton } from "@/shared";
import styles from "./rune-image.module.scss";
/**
 * - choosenCondition - add style to View if condition === true
 * - imgSrc - simple not absolute src image
 * - minMaxSize - sets min and max size of image. default = 40, 40
 */

interface RuneImageProps {
  choosenCondition: boolean;
  imgSrc: string;
  minMaxSize?: { width: number; height: number };
  onClickImg?: (btn: MouseButton) => void;
}

export function RuneImage({
  choosenCondition,
  imgSrc,
  minMaxSize,
  onClickImg,
}: RuneImageProps) {
  return (
    <div
      id="rune-image-wrapper"
      className={choosenCondition ? styles.choosen : ""}
      onMouseDown={(e) => {
        if (!onClickImg) return;
        const mouseBtn = e.nativeEvent.button;
        const mouseBtnString =
          mouseBtn === 0
            ? MouseButton.LEFT
            : mouseBtn === 2
            ? MouseButton.RIGHT
            : mouseBtn === 1
            ? MouseButton.SCROLL
            : MouseButton.OTHER;

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
