
export type TableColumnInfo = {
    label: string,
    minWidth?: number,
    fieldName: string
}
export type DataSource = {
    [key: string]: string | number | JSX.Element
}