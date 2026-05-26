
type FieldObject = { value: string; id: string };


export  const normalizeArrayField = (field?: string[] | { value: string; id: string }[]): FieldObject[] => {
  if (!field || field.length === 0) return [{ value: "", id: Math.random().toString(36).substring(2, 9) }];

  return field.flatMap((item) => {
    if (typeof item === "string") return [{ value: item, id: Math.random().toString(36).substring(2, 9) }];
    try {
      const values: string[] = JSON.parse(item.value);
      if (!Array.isArray(values)) return [];
      return values.map((v) => ({ value: v, id: Math.random().toString(36).substring(2, 9) }));
    } catch {
      return [{ value: item.value || "", id: item.id || Math.random().toString(36).substring(2, 9) }];
    }
  });
};