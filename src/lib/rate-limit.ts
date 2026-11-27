import "server-only";

/**
 * Limiteur simple en mémoire : suffisant pour un site vitrine.
 * Sur un hébergement serverless, chaque instance a sa mémoire ; la contrainte
 * d'unicité et le délai minimal de saisie complètent la protection.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 3, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return true;
}
