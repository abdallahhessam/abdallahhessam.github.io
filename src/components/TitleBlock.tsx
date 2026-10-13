/** Drawing-sheet title block: labelled cells with ruled borders. */
export function TitleBlock({
  cells,
  className = "",
  columns = "sm:grid-cols-2",
}: {
  cells: { label: string; value: string; highlight?: boolean }[];
  className?: string;
  columns?: string;
}) {
  return (
    <dl className={`grid grid-cols-1 border-l border-t border-rule ${columns} ${className}`}>
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={`border-b border-r border-rule px-3 py-2.5 ${
            cells.length % 2 === 1 && i === cells.length - 1 && columns.includes("cols-2") ? "sm:col-span-2" : ""
          }`}
        >
          <dt className="text-[0.78rem] text-faint">{c.label}</dt>
          <dd className={`text-[0.93rem] leading-snug ${c.highlight ? "text-amber" : "text-ink"}`}>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}
