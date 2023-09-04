import { LineEdit } from "@nodegui/react-nodegui";
import React from "react";
import { WidgetEventListeners } from "@nodegui/react-nodegui/dist/components/View/RNView";
import { QLineEditSignals } from "@nodegui/nodegui";
interface LineEditVariantProps {
  text?: string;
  on?: Partial<WidgetEventListeners | QLineEditSignals>;
}

export function PrimaryLineEdit({ text, on }: LineEditVariantProps) {
  return <LineEdit id="primary-line-edit" text={text} on={on} />;
}

export function SecondaryLineEdit({ text, on }: LineEditVariantProps) {
  return <LineEdit id="secondary-line-edit" text={text} on={on} />;
}

export function DangerLineEdit({ text, on }: LineEditVariantProps) {
  return <LineEdit id="danger-line-edit" text={text} on={on} />;
}

export function SuccessLineEdit({ text, on }: LineEditVariantProps) {
  return <LineEdit id="success-line-edit" text={text} on={on} />;
}

export function InfoLineEdit({ text, on }: LineEditVariantProps) {
  return <LineEdit id="info-line-edit" text={text} on={on} />;
}
