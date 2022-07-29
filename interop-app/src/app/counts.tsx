interface Props {
  title: string;
  added?: number;
  removed?: number;
}

export function Counts({ title, added, removed }: Props) {
  const current = (added ?? 0) - (removed ?? 0);
  return (
    <div>
      {title}: {current} (+{added}/-{removed})
    </div>
  );
}

export default Counts;
