export function isActivePath(pathname: string, target: string): boolean {
  if (!pathname || !target) return false;
  return pathname === target;
}
