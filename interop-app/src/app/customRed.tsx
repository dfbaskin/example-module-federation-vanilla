import { useEffect } from "react";
import { ComponentPanel } from "./componentPanel";
import { useComponentStore } from "./componentStore";
import { Counts } from "./counts";
import { countsSelectorFactory } from "./countsSelector";
import "./customRed.css";

const countsSelector = countsSelectorFactory("red");

interface Props {
  id: string;
  publishEvent: (event: Event) => boolean;
}

export function CustomRed({ id, publishEvent }: Props) {
  const { addComponent, removeComponent, ...counts } =
    useComponentStore(countsSelector);

  useEffect(() => {
    addComponent("red");
    return () => {
      removeComponent("red");
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
    <ComponentPanel className="custom-red" onClosePanel={onClosePanel}>
      <h1>RED</h1>
      <div>{id}</div>
      <div>
        <Counts
          title="RED"
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

export default CustomRed;
