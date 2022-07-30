import { useEffect } from "react";
import { ComponentPanel } from "./componentPanel";
import { useComponentStore } from "./componentStore";
import { Counts } from "./counts";
import { countsSelectorFactory } from "./countsSelector";
import "./customBlue.css";

const countsSelector = countsSelectorFactory("blue");

interface Props {
  id: string;
  publishEvent: (event: Event) => boolean;
}

export function CustomBlue({ id, publishEvent }: Props) {
  const { addComponent, removeComponent, ...counts } =
    useComponentStore(countsSelector);

  useEffect(() => {
    addComponent("blue");
    return () => {
      removeComponent("blue");
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
    <ComponentPanel className="custom-blue" onClosePanel={onClosePanel}>
      <h1>BLUE</h1>
      <div>{id}</div>
      <div>
        <Counts
          title="BLUE"
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

export default CustomBlue;
