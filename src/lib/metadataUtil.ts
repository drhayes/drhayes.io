type Metadata = {
  title: string,
  date: Date,
  updated?: Date,
  description?: string,
  slug?: string,
  tags?: string[],
}

export const whichDate = metadata => metadata.updated || metadata.date;
export const dateSortDescending = (a: Metadata, b: Metadata): -1 | 1 => whichDate(a) > whichDate(b) ? -1 : 1;
export const dateSortAscending = (a: Metadata, b: Metadata): -1 | 1 => whichDate(a) < whichDate(b) ? -1 : 1;
// Sveltekit (?) doesn't like exporting this type here in certain cases! Causes compilation error where it says
// "The requested module '/src/lib/metadataUtil.ts?t=xxxxxx' does not provide an export named
// 'Metadata'". I'm **pretty** sure it's because it was only used on the client and thus was
// rollup-ed out of existence!
export type { Metadata };
