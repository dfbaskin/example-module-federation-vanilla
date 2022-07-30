import { useEffect } from "react";
import { ComponentPanel } from "./componentPanel";
import { useComponentStore } from "./componentStore";
import { Counts } from "./counts";
import { countsSelectorFactory } from "./countsSelector";
import "./customGreen.css";

const countsSelector = countsSelectorFactory("green");

interface Props {
  id: string;
  publishEvent: (event: Event) => boolean;
}

export function CustomGreen({ id, publishEvent }: Props) {
  const { addComponent, removeComponent, ...counts } =
    useComponentStore(countsSelector);

  useEffect(() => {
    addComponent("green");
    return () => {
      removeComponent("green");
    };
  }, []);

  const onClosePanel = () => {
    publishEvent(
      new CustomEvent("panelClosed", {
        bubbles: true,
        detail: { panelId: id },
      })
    );
  };

  return (
    <ComponentPanel className="custom-green" onClosePanel={onClosePanel}>
      <h1>GREEN</h1>
      <div>{id}</div>
      <div>
        <Counts
          title="GREEN"
          added={counts.addedCount}
          removed={counts.removedCount}
        />
        <Counts
          title="Total"
          added={counts.addedTotalCount}
          removed={counts.removedTotalCount}
        />
      </div>
    </ComponentPanel>
  );
}

export default CustomGreen;
