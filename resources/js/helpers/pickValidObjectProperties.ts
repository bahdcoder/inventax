export function pickValidObjectProperties(object: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  );
}
