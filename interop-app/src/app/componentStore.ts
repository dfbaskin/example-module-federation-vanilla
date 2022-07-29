import createStore from 'zustand/vanilla';
import createHook from 'zustand';
import produce from 'immer';

interface Counts {
  added: number;
  removed: number;
}

export interface ComponentStoreState {
  counts: {
    [key: string]: Counts;
  };
  totals: Counts;
  addComponent(componentType: string): void;
  removeComponent(componentType: string): void;
}

export const componentStore = createStore<ComponentStoreState>((set) => ({
  counts: {},
  totals: {
    added: 0,
    removed: 0,
  },
  addComponent(componentType: string) {
    return set(
      produce((draft) => {
        const componentCounts =
          draft.counts[componentType] ??
          (draft.counts[componentType] = { added: 0, removed: 0 });
        componentCounts.added += 1;
        draft.totals.added += 1;
      })
    );
  },
  removeComponent(componentType: string) {
    return set(
      produce((draft) => {
        const componentCounts =
          draft.counts[componentType] ??
          (draft.counts[componentType] = { added: 0, removed: 0 });
        componentCounts.removed += 1;
        draft.totals.removed += 1;
      })
    );
  },
}));

export const useComponentStore = createHook(componentStore);
