export interface ICreateTag {
    name: string,
    parentId: string,
    isCollapsed: boolean,
    isRetailVisible: boolean,
    isB2BVisible: boolean,
    isUniversal: boolean,
    sortOrder: number
}