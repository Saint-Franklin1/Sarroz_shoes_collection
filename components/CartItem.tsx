export function CartItem({ item, onRemove }: { item: any; onRemove: (id: string) => void }) {
  return (
    <div className="flex items-center justify-between rounded border bg-white p-3">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
      </div>
      <button className="text-red-600" onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}
