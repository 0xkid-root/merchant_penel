export function formatTransactionId(id: string): string {
  if (!id || id.length <= 8) return id;
  
  const firstPart = id.substring(0, 4);
  const lastPart = id.substring(id.length - 4);
  
  return `${firstPart}...${lastPart}`;
}
