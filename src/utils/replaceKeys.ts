export const replaceKeys: any = (obj: any | any[], keysMap: { [key: string]: string }) => {
  if (!obj) return;
  if (Array.isArray(obj)) {
    return obj.map((item) => replaceKeys(item, keysMap));
  } else {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = keysMap[key] || key;
      // @ts-ignore
      acc[newKey] = obj[key];
      return acc;
    }, {});
  }
};
