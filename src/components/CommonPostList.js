import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/ConfigureStore';

import Profile from '../image/profile_small.png';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button, Grid, Image } from '../elements/index';
import { BiTimeFive, BiLike, BiComment, BiSort} from 'react-icons/bi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa";

const CommonPostList = (props) => {

  const common_list = useSelector(state => state.post.list);

  // 게시물 최신순으로 구현하는 함수
const all_common = common_list.slice(0, common_list.length)
.sort(function(a, b) {
  const timeA = a.createdAt; const timeB = b.createdAt; 
  if (timeA < timeB) return 1; if (timeA > timeB) return -1; });

  return (
    <React.Fragment>
      <Content common_list={all_common} key={props.postId} onClick={() => history.push(`/common/detail/${props.postId}`)}
                >
                <Text p color="#F1F3F4" lineHeight="27px" fontSize="18px" fontWeight="bold">
                 {props.title}
                </Text>
                <Text p color="#9AA0A6" lineHeight="18px" fontSize="14px" >
                 {props.content}
               </Text>
              <ProfileImage>
                <img src={Profile} alt='프로필' style={{margin: "0 8px 0 0"}}/>
                <Text lineHeight="16px" fontSize="12px" color="#9AA0A6" margin= "0px 8px">
                {props.nickname}
                </Text>
                <Text color="#9AA0A6" fontSize="12px" margin= "0px 8px"  >
                  <BiTimeFive/> &nbsp; {props.createdAt}
                </Text>
              </ProfileImage>
            
              {/* 게시한 좋아요, 댓글 */}
            <Grid width="100%" float="left">
            <LikeAndCountBox>
              <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%" margin= "0 8px 0 0">
                <BiLike/> &nbsp; {props.likes}
                </Text>
              <Text color="#9AA0A6" fontSize="1.6vh" padding="2%" width="33.3%" margin= "0px 8px">
                <BiComment/> &nbsp; 2
              </Text>
            </LikeAndCountBox>
            
            <hr/>
            </Grid>
            </Content>
    </React.Fragment>
  )
};

const Content = styled.div`
  z-index: 1;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background-size: cover;
  box-sizing: border-box;
  padding: 0% 3%;
  &:hover {
    opacity: 0.7;
  }
`;

const ProfileImage = styled.div`
display: flex;
/* height: 10%;
padding: 3%; */
width: 400px;
height: 24px;
left: 24px;
top: 111px;
`;

const LikeAndCountBox = styled.div`
width: 140px;
height: 16px;
left: 24px;
top: 151px;
margin: 10px 0 0 0;
`;

export default CommonPostList;