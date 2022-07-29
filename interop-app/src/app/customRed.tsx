import { useEffect } from 'react';
import { useComponentStore } from './componentStore';
import { Counts } from './counts';
import { countsSelectorFactory } from './countsSelector';
import './customRed.css';

const countsSelector = countsSelectorFactory('red');

export function CustomRed() {
  const { addComponent, removeComponent, ...counts } =
    useComponentStore(countsSelector);

  useEffect(() => {
    addComponent('red');
    return () => {
      removeComponent('red');
    };
  }, []);

  return (
    <div className="custom-red">
      <h1>RED</h1>
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
    </div>
  );
}

export default CustomRed;
