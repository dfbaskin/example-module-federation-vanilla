import { ReactNode, useState } from "react";
import CloseButton from "./closeButton";
import "./closeButton.css";

interface Props {
  className: string;
  children: ReactNode;
  onClosePanel?: () => void;
}

export function ComponentPanel({ className, children, onClosePanel }: Props) {
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  return (
    <div
      className={className}
      onMouseOver={() => setShowCloseButton(true)}
      onMouseOut={() => setShowCloseButton(false)}
    >
      <CloseButton show={showCloseButton} onClick={() => onClosePanel?.()} />
      {children}
    </div>
  );
}

export default ComponentPanel;
