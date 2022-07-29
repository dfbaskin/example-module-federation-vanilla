import { useEffect } from 'react';
import { ComponentPanel } from './componentPanel';
import { useComponentStore } from './componentStore';
import { Counts } from './counts';
import { countsSelectorFactory } from './countsSelector';
import './customGreen.css';

const countsSelector = countsSelectorFactory('green');

export function CustomGreen() {
  const { addComponent, removeComponent, ...counts } =
    useComponentStore(countsSelector);

  useEffect(() => {
    addComponent('green');
    return () => {
      removeComponent('green');
    };
  }, []);

  return (
    <ComponentPanel className='custom-green'>
      <h1>GREEN</h1>
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
