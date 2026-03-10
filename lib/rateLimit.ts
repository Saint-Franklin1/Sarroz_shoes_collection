const bucket = new Map<string, number[]>();

export function rateLimitByIp(ip: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const history = bucket.get(ip) ?? [];
  const freshHistory = history.filter((timestamp) => now - timestamp < windowMs);

  if (freshHistory.length >= maxRequests) {
    bucket.set(ip, freshHistory);
    return { allowed: false, retryAfterMs: windowMs - (now - freshHistory[0]) };
  }

  freshHistory.push(now);
  bucket.set(ip, freshHistory);
  return { allowed: true, retryAfterMs: 0 };
}
