export type Replace<OriginalType, ReplaceTyples> = Omit<
    OriginalType,
    keyof ReplaceTyples
> & ReplaceTyples;