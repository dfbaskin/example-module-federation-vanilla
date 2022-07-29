import { useEffect } from 'react';
import { useComponentStore } from './componentStore';
import { Counts } from './counts';
import { countsSelectorFactory } from './countsSelector';
import './customBlue.css';

const countsSelector = countsSelectorFactory('blue');

export function CustomBlue() {
  const { addComponent, removeComponent, ...counts } =
    useComponentStore(countsSelector);

  useEffect(() => {
    addComponent('blue');
    return () => {
      removeComponent('blue');
    };
  }, []);

  return (
    <div className="custom-blue">
      <h1>BLUE</h1>
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
    </div>
  );
}

export default CustomBlue;
