import React from 'react';
import styled from "styled-components";
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';

import {Text, Button, Grid, Input} from "../elements/index";
import Header from '../components/Header';
import { actionCreators as commentActions} from "../redux/modules/comment";
//icons
import { BiTimeFive, BiLike, BiComment } from 'react-icons/bi';

const Comment = (props) => {
    const dispatch = useDispatch();
    // 리덕스 : 게시글 상세 조회, 해당 게시물 댓글 리스트 조회
    const comment_list = useSelector(state => state.comment.list);

    // 댓글 확인
    const [content, setComments] = React.useState('');
    const checkComments = (e) => {
      setComments(e.target.value);
    }

    //댓글 등록
    const addComment = () => {
        const new_comment = {
            content : content,
            nickname : "username"
        }
      dispatch(commentActions.addCommentDB(new_comment, props.postId));
    }

    // 댓글 조회
    React.useEffect(() => {
        dispatch(commentActions.setCommentDB(props.postId));
    }, []);

    // 댓글 수정
    const editComment = () => {
        const edited_comment = {
        }
    }

    // 댓글 삭제
    const deleteComment = () => {
    }
    
    return (
        <React.Fragment>
            <Grid>
        <Text padding="2%" fontWeight="bold" fontSize="10px">
          댓글5
        </Text>
        <CommentBox>
        <Input font_size="9px" border="1px solid #E5E5E5;"
        placeholder="댓글을 남겨주세요" _onChange={checkComments}/>
        <Button border="none" height="40px" color="white" bg="Grey" cursor="pointer" width="15%"
        _onClick={addComment} >
          등록
        </Button>
        </CommentBox>
        <Hr/>
        <div style={{textAlign: "center"}}>
        <Text style={{display: "inline-block"}} padding="2%" fontWeight="bold" fontSize="11px">댓글1개더보기</Text>
        <Hr/>
        </div>
      </Grid>
        {/* 댓글 달기 */}
      <Grid>
        {comment_list && comment_list.map((ct, index) => {
        return (
          <Content>
            <Text padding="0% 2%" color="Grey" fontSize="7px">{ct.nickname}</Text>
            <Text p margin="0px" padding="0% 2%" fontSize="11px">{ct.content}</Text>
            <Grid display="flex" width="100%" >
              <Text padding="2%" width="33.3%" fontSize="12px"><BiTimeFive/>{ct.createdAt}</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiLike/> 10</Text>
              <Text padding="2%" width="33.3%" fontSize="12px"><BiComment/> 2</Text>

          {/* 수정, 삭제 버튼 */}
              <Grid width="30%" height="60%" display="flex" margin="auto 0 auto auto">
                <Button border="none" color="white" bg="Grey" width="45%" margin="0 10% 0 0"
                _onClick={editComment} >
                  수정
                </Button>
                <Button border="none" color="white" bg="Grey" width="45%"
                _onClick={deleteComment} >
                  삭제
                </Button>
              </Grid>
            </Grid>
          </Content>
        )
      })}
      </Grid>
        </React.Fragment>
    )
}

const Hr = styled.hr`
border: 0.5px solid #E5E5E5;
margin: 7px 0px;
`;

const Content = styled.div`
border-bottom: 1px solid #E5E5E5;
width: 100%;
height: 100%;
padding: 1% 2%;
`;

const CommentBox = styled.div`
display: flex;
padding: 2%;
`;

export default Comment;