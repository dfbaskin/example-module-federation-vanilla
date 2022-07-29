import { useEffect, useMemo, useReducer } from 'react';
import { Subject, tap } from 'rxjs';

type ActiveInteropComponentEntry = [React.ReactNode, HTMLElement];

const activeComponents: Map<string, ActiveInteropComponentEntry> = new Map();

function nextComponentKeyFactory() {
  let idx = 0;
  return () => {
    ++idx;
    return `cmpint-${idx}`;
  };
}

const nextComponentKey = nextComponentKeyFactory();
const updateSubject = new Subject<boolean>();

export function registerInteropComponent(
  children: React.ReactNode,
  element: HTMLElement
) {
  const key = nextComponentKey();
  activeComponents.set(key, [children, element]);
  updateSubject.next(true);
  return () => {
    activeComponents.delete(key);
  };
}

export function useActiveInteropComponents() {
  const [counter, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const subscription = updateSubject
      .asObservable()
      .pipe(
        tap(() => {
          forceUpdate();
        })
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  const components = useMemo(() => {
    return [...activeComponents].map(([key, value]) => {
      return [key, ...value] as [string, React.ReactNode, HTMLElement];
    });
  }, [counter]);

  return components;
}
