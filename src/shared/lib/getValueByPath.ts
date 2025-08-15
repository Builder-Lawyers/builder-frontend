export function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object") {
      if (Array.isArray(acc)) {
        return acc[Number(part)];
      }
      return acc[part];
    }
    return undefined;
  }, obj);
}
