export function RatingComponent({ rating }: { rating: number }) {
  return <p className="text-amber-500">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</p>;
}
