import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {DataSource, TableColumnInfo} from '../Model';
// import { DataSource, TableColumnInfo } from "../Service";

type GeneralTableProps = {
  columns: TableColumnInfo[];
  dataSource?: DataSource[];
  isPagination?: boolean;
  pageNum?: number;
  totalRecord?: number;
  pageSize?: number;
  onPageChange?: (pageNum: number, pageSize: number) => void;
  onItemsPerPageChange?: (pageNum: number, pageSize: number) => void;
};
export const GeneralTable = (props: GeneralTableProps) => {
  const {
    columns,
    dataSource,
    isPagination,
    pageNum = 0,
    totalRecord = 0,
    pageSize = 10,
    onPageChange,
    onItemsPerPageChange,
  } = props;
  return (
    <View style={tableStyles.container}>
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator>
          <DataTable style={tableStyles.tableContainer}>
            <DataTable.Header style={tableStyles.tableHeader}>
              {columns &&
                columns.length > 0 &&
                columns.map((item, index) => (
                  <DataTable.Title
                    style={{width: item.minWidth}}
                    key={`columns_${index}`}>
                    <Text style={tableStyles.tableHeaderText}>
                      {item.label}
                    </Text>
                  </DataTable.Title>
                ))}
            </DataTable.Header>
            {dataSource &&
              dataSource.length > 0 &&
              dataSource.map((dataItem, index) => {
                return (
                  <DataTable.Row key={`dataItem_${index}`}>
                    {columns.map((columnItem, subIndex) => {
                      return (
                        <DataTable.Cell
                          key={`columnItem_${subIndex}`}
                          style={{width: columnItem.minWidth}}>
                          <Text numberOfLines={2}>
                            {dataItem[columnItem.fieldName]}
                          </Text>
                        </DataTable.Cell>
                      );
                    })}
                  </DataTable.Row>
                );
              })}
          </DataTable>
        </ScrollView>
      </ScrollView>
      {isPagination && (
        <DataTable.Pagination
          page={pageNum}
          numberOfPages={Math.ceil(totalRecord / pageSize)}
          onPageChange={page => onPageChange && onPageChange(page, pageSize)}
          label={`${pageNum * pageSize + 1}-${
            pageSize * (pageNum + 1)
          } of ${totalRecord}`}
          numberOfItemsPerPageList={[10, 25, 50]}
          numberOfItemsPerPage={pageSize}
          onItemsPerPageChange={numberOfItemsPerPage => {
            if (totalRecord <= pageNum * numberOfItemsPerPage) {
              onItemsPerPageChange &&
                onItemsPerPageChange(0, numberOfItemsPerPage);
            } else {
              onItemsPerPageChange &&
                onItemsPerPageChange(pageNum, numberOfItemsPerPage);
            }
          }}
        />
      )}
    </View>
  );
};
const tableStyles = StyleSheet.create({
  container: {
    maxHeight: 500,
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D3DCE6',
    marginHorizontal: 10,
  },
  tableHeader: {
    width: '100%',
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    color: '#70777E',
    fontSize: 13,
    fontWeight: 'bold',
    // whiteSpace: "nowrap",
  },
});
