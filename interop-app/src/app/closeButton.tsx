import "./closeButton.css";

interface Props {
  show?: boolean;
  onClick?: React.MouseEventHandler;
}

export function CloseButton({ show, onClick }: Props) {
  const classNames = ["close-button", show ? "show" : ""]
    .filter((c) => c)
    .join(" ");
  return (
    <div className={classNames}>
      <button type="button" onClick={(evt) => onClick?.(evt)}>
        &#x2716;
      </button>
    </div>
  );
}

export default CloseButton;
