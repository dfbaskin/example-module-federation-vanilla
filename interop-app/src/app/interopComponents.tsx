import { createPortal } from 'react-dom';
import { useActiveInteropComponents } from './useActiveInteropComponents';

export function InteropComponents() {
  const activeComponents = useActiveInteropComponents();
  return (
    <>
      {activeComponents.map(([key, children, element]) => {
        return createPortal(children, element, key);
      })}
    </>
  );
}

export default InteropComponents;
