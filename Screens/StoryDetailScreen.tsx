import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CommentInfo,
  GeneralTable,
  SectionContent,
  StoryService,
  TableColumnInfo,
} from '../Common';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from './Navigation/MainStackParamList';
import {FieldDescription, FieldTitle} from '../Common/Components/FieldTitle';
import {pipe} from 'fp-ts/lib/function';
import {ZIO} from '@mxt/zio';
import moment from 'moment';
import * as A from 'fp-ts/lib/Array';

export const StoryDetailScreen = (
  props: StackScreenProps<MainStackParamList, 'StoryDetailScreen'>,
) => {
  const storyID = props.route.params.storyID || '';
  const [storyDetail, setStoryDetail] =
    React.useState<StoryService.StoryDetailInfo>();
  const [pageNum, setPageNum] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [commentIDList, setCommentIDList] = React.useState<Array<number>>([]);
  const [commentInfoList, setCommentInfoList] = React.useState<
    Array<CommentInfo>
  >([]);

  const displayedColumns: TableColumnInfo[] = [
    {
      label: 'ID',
      fieldName: 'id',
      minWidth: 80,
      // render: selectedItem => {
      //   const storyID = selectedItem.selectItem['id'];
      //   return (
      //     <TouchableOpacity onPress={() => {}}>
      //       <Text style={storyStyle.hightLightText} numberOfLines={2}>
      //         {storyID}
      //       </Text>
      //     </TouchableOpacity>
      //   );
      // },
    },
    {
      label: 'Text',
      fieldName: 'text',
      minWidth: 320,
    },
    {label: 'Comment By', fieldName: 'by', minWidth: 170},
    {label: 'CommentDate', fieldName: 'time', minWidth: 170},
  ];

  React.useEffect(() => {
    if (storyID) {
      pipe(
        StoryService.getStoryDetail(storyID),
        ZIO.map(responseData => {
          setStoryDetail(responseData);
          if (
            responseData &&
            responseData.kids &&
            responseData.kids.length > 0
          ) {
            setCommentIDList(responseData.kids);
            setTotalRecord(responseData.kids.length);
          } else {
            setCommentIDList([]);
            setTotalRecord(0);
          }
          return responseData;
        }),
        ZIO.unsafeRun({}),
      );
    }
  }, [storyID]);

  console.log('commentIDList', JSON.stringify(commentIDList));

  React.useEffect(() => {
    if (commentIDList && commentIDList.length > 0) {
      getNewCommentList(0, 10);
    }
  }, [commentIDList]);

  const formatDateToString = (value: number | undefined) => {
    return value ? moment(moment(value).toDate()).format('DD/MM/YYYY') : '';
  };

  const getNewCommentList = (pageNum: number, pageSi: number) => {
    setPageNum(pageNum);
    setPageSize(pageSi);
    const orderedCommentIDList = commentIDList.slice(
      pageSi * pageNum,
      (1 + pageNum) * pageSi,
    );
    pipe(
      orderedCommentIDList,
      A.map(commentID => StoryService.getCommentDetail(commentID.toString())),
      ZIO.sequence,
      ZIO.map(responseData => {
        setCommentInfoList(
          responseData.map(item => ({
            id: item.id,
            text: item.text || '',
            time: item.time,
            by: item.by || '',
          })),
        );
        // console.log('responseData:', JSON.stringify(responseData));
        return responseData;
      }),
      ZIO.unsafeRun({}),
    );
  };

  return (
    <ScrollView style={storyStyle.container}>
      <View style={storyStyle.headerContent}>
        <Text style={storyStyle.headerTitle}>Story Detail: {storyID}</Text>
      </View>
      <SectionContent>
        <View style={storyStyle.blockContainer}>
          <FieldTitle text={'Title'}></FieldTitle>
          <FieldDescription text={storyDetail?.title || ''}></FieldDescription>
        </View>
        <View style={storyStyle.blockContainer}>
          <FieldTitle text={'Score'}></FieldTitle>
          <FieldDescription
            text={
              storyDetail ? storyDetail?.score?.toString() : ''
            }></FieldDescription>
        </View>
        <View style={storyStyle.blockContainer}>
          <FieldTitle text={'Create By'}></FieldTitle>
          <FieldDescription text={storyDetail?.by || ''}></FieldDescription>
        </View>
        <View style={storyStyle.blockContainer}>
          <FieldTitle text={'Create Date'}></FieldTitle>
          <FieldDescription
            text={formatDateToString(storyDetail?.time)}></FieldDescription>
        </View>
      </SectionContent>
      {commentIDList && commentIDList.length > 0 && (
        <>
          <View style={storyStyle.headerContent}>
            <Text style={storyStyle.headerTitle}>Comment List</Text>
          </View>
          <View style={storyStyle.listContainer}>
              <GeneralTable
                columns={displayedColumns}
                dataSource={commentInfoList}
                isPagination={true}
                pageNum={pageNum}
                totalRecord={totalRecord}
                pageSize={pageSize}
                onPageChange={(pageNo: number, pageS: number) => {
                  getNewCommentList(pageNo, pageSize);
                }}
                onItemsPerPageChange={(pageNo: number, pageS: number) => {
                  if (totalRecord <= (pageNum + 1) * pageS) {
                    getNewCommentList(0, pageS);
                  } else {
                    getNewCommentList(pageNum, pageS);
                  }
                }}></GeneralTable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const storyStyle = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    // marginBottom: 50,
  },
  listContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    width: "100%",
    height: '100%',
    // backgroundColor: '#0f0',
    // marginBottom: 50,
  },
  blockContainer: {
    marginTop: 20,
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
