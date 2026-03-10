export function AdminTable({ headers, rows }: { headers: string[]; rows: Array<Array<string | number>> }) {
  return (
    <table className="w-full overflow-hidden rounded bg-white text-sm shadow">
      <thead className="bg-slate-100">
        <tr>{headers.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t">{r.map((c, ci) => <td key={ci} className="p-2">{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
