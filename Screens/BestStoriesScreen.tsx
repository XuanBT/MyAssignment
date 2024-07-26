import {useIsFocused} from '@react-navigation/native';
import {pipe} from 'fp-ts/lib/function';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  GeneralTable,
  NewStoryInfo,
  StoryService,
  TableColumnInfo,
} from '../Common';
import {ZIO} from '@mxt/zio';
import * as A from 'fp-ts/lib/Array';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { MainStackParamList } from './Navigation/MainStackParamList';
import { StackScreenProps } from '@react-navigation/stack';

export const BestStoriesScreen = (props: StackScreenProps<MainStackParamList,"BestStoriesScreen">) => {
  const isFocused = useIsFocused();
  const [newStoryList, setNewStoryList] = React.useState<Array<NewStoryInfo>>(
    [],
  );
  const [storyIDList, setStoryIDList] = React.useState<Array<number>>([]);
  const [pageNum, setPageNum] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const displayedColumns: TableColumnInfo[] = [
    {
      label: 'ID',
      fieldName: 'id',
      minWidth: 80,
      render: (selectedItem) => {
        const storyID = selectedItem.selectItem['id'];
        return (
          <TouchableOpacity onPress={() => onNavigateDetailScreen(storyID.toString())}>
            <Text style={storyStyle.hightLightText} numberOfLines={2}>
              {storyID}
            </Text>
          </TouchableOpacity>
        );
      },
    },
    {
      label: 'Title',
      fieldName: 'title',
      minWidth: 270,
    },
    {label: 'Score', fieldName: 'score', minWidth: 80},
  ];
  React.useEffect(() => {
      pipe(
        StoryService.getBestStoryIDList(),
        ZIO.map(responseData => {
          setStoryIDList(responseData);
          setTotalRecord(responseData.length);
          // console.log('responseData:', JSON.stringify(responseData));
          return responseData;
        }),
        ZIO.unsafeRun({}),
      );
  }, []);

  React.useEffect(() => {
    if (storyIDList && storyIDList.length > 0) {
      getNewStoryList(0, 10);
    }
  }, [storyIDList]);

  const getNewStoryList = (pageNum: number, pageSi: number) => {
    setPageNum(pageNum);
    setPageSize(pageSi);
    const filterStoryIDList = storyIDList.slice(
      pageSi * pageNum,
      (1 + pageNum) * pageSi,
    );
    pipe(
      filterStoryIDList,
      A.map(storyID => StoryService.getStoryDetail(storyID.toString())),
      ZIO.sequence,
      ZIO.map(responseData => {
        setNewStoryList(
          responseData.map(item => ({
            id: item.id.toString(),
            title: item.title.toString(),
            score: item.score.toString(),
          })),
        );
        // console.log('responseData:', JSON.stringify(responseData));
        return responseData;
      }),
      ZIO.unsafeRun({}),
    );
  };

  const onNavigateDetailScreen = (storyID: string) => {
    console.log('storyID',storyID)
    props.navigation.navigate("StoryDetailScreen", {
      storyID: storyID
    })
  }
  return (
    <View style={storyStyle.container}>
      <View style={storyStyle.headerContent}>
        <Text style={storyStyle.headerTitle}>Best story list</Text>
      </View>
      <GeneralTable
        columns={displayedColumns}
        dataSource={newStoryList}
        isPagination={true}
        pageNum={pageNum}
        totalRecord={totalRecord}
        pageSize={pageSize}
        onPageChange={(pageNo: number, pageS: number) => {
          getNewStoryList(pageNo, pageSize);
        }}
        onItemsPerPageChange={(pageNo: number, pageS: number) => {
          if (totalRecord <= (pageNum + 1) * pageS) {
            getNewStoryList(0, pageS);
          } else {
            getNewStoryList(pageNum, pageS);
          }
        }}></GeneralTable>
    </View>
  );
};

const storyStyle = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  headerContent: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hightLightText: {
    textDecorationLine: 'underline',
    color: 'rgb(30, 165, 252)',
  },
});
