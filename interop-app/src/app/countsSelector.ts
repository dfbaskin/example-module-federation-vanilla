import { ComponentStoreState } from './componentStore';

export const countsSelectorFactory = (componentType: string) => {
  return (state: ComponentStoreState) => {
    const counts = state.counts[componentType];
    return {
      addedCount: counts?.added,
      removedCount: counts?.removed,
      addedTotalCount: state.totals.added,
      removedTotalCount: state.totals.removed,
      addComponent: state.addComponent,
      removeComponent: state.removeComponent,
    };
  };
};
