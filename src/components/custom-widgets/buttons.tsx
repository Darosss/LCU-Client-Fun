import { Button } from "@nodegui/react-nodegui";
import React from "react";
import { WidgetEventListeners } from "@nodegui/react-nodegui/dist/components/View/RNView";
import { QAbstractButtonSignals } from "@nodegui/nodegui";
interface ButtonVariantProps {
  text: string;
  on?: Partial<QAbstractButtonSignals | WidgetEventListeners>;
  style?: string;
}

export function PrimaryButton({
  text = "primary button",
  on,
  style = "",
}: ButtonVariantProps) {
  return <Button id="primary-button" text={text} on={on} style={style} />;
}

export function SecondaryButton({
  text = "secondary button",
  on,
  style = "",
}: ButtonVariantProps) {
  return <Button id="secondary-button" text={text} on={on} style={style} />;
}

export function DangerButton({
  text = "danger button",
  on,
  style = "",
}: ButtonVariantProps) {
  return <Button id="danger-button" text={text} on={on} style={style} />;
}

export function SuccessButton({
  text = "success button",
  on,
  style = "",
}: ButtonVariantProps) {
  return <Button id="success-button" text={text} on={on} style={style} />;
}

export function InfoButton({
  text = "info button",
  on,
  style = "",
}: ButtonVariantProps) {
  return <Button id="info-button" text={text} on={on} style={style} />;
}
