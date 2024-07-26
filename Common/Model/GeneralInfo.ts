import React from 'react'


export type TableColumnInfo = {
    label: string,
    minWidth?: number,
    fieldName: string
    render?:(selectedItem: SelectedRow) => React.JSX.Element
}
export type DataSource = {
    [key: string]: string | number | JSX.Element
}

interface SelectedRow {
    index: number
    selectItem: DataSource
  }