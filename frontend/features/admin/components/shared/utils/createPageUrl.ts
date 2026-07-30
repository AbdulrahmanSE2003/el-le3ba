export default function createPageUrl(
  key: string,
  value: string | number | undefined,
  searchParams: string,
) {
  // Copy current URL params to preserve existing filters (search, limit, etc.)
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value as string);
  } else params.delete(key);

  if (key !== "page") {
    params.set("page", "1");
  }

  return `?${params.toString()}`;
}
