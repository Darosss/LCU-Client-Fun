import { Text } from "@nodegui/react-nodegui";
import { WidgetEventListeners } from "@nodegui/react-nodegui/dist/components/View/RNView";
import { QLabelSignals } from "@nodegui/nodegui";
import React from "react";

interface TextVariantProps {
  text: string;
  on?: Partial<QLabelSignals | WidgetEventListeners>;
}

export function PrimaryText({ text = "primary text", on }: TextVariantProps) {
  return (
    <Text id="primary-label" on={on}>
      {text}
    </Text>
  );
}

export function SecondaryText({
  text = "secondary text",
  on,
}: TextVariantProps) {
  return (
    <Text id="secondary-label" on={on}>
      {text}
    </Text>
  );
}

export function DangerText({ text = "danger text", on }: TextVariantProps) {
  return (
    <Text id="danger-label" on={on}>
      {text}
    </Text>
  );
}

export function SuccessText({ text = "success text", on }: TextVariantProps) {
  return (
    <Text id="success-label" on={on}>
      {text}
    </Text>
  );
}

export function InfoText({ text = "info text", on }: TextVariantProps) {
  return (
    <Text id="info-label" on={on}>
      {text}
    </Text>
  );
}
