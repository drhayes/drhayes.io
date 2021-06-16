const slugFromPath = (path: string): string | null => path.match(/([\w-]+)\.(md)/i)?.[1] ?? null;

export default slugFromPath;
