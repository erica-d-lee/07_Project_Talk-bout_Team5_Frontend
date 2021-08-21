import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import { BsX } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';
import { history } from '../redux/ConfigureStore';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import StarRatingComponent from 'react-star-rating-component';
import { getCookie } from '../shared/cookie';

const BootReviewWrite = (props) => {
  const dispatch = useDispatch();
  const camp_name = props.location.state.camp_name;
  // const user_name = useSelector(state => state.user.user.nickname);
  const user_name = getCookie('nickname');

  // 별점을 state에 저장하기
  const [stars, setStars] = useState(0);
  const onClickStar = (e) => {
    setStars(e);
  }

  // 리뷰 제목, 수료 여부, 장점, 단점에 useRef 설정
  const titleInput = useRef(null);
  const courseInput = useRef(null);
  const prosInput = useRef(null);
  const consInput = useRef(null);

  const exitPage = () => {
    if (window.confirm('변경사항이 저장되지 않을 수 있습니다.')) {
      history.goBack();
    }
  };

  // 리뷰 [등록] 버튼 누르면 호출되는 함수
  const addReview = () => {
    if (titleInput.current.value === '') {
      window.alert('제목을 입력해주세요.')
      return;
    }
    if (stars === 0) {
      window.alert('평점을 매겨주세요.')
      return;
    }
    if (courseInput.current.value === '') {
      window.alert('수료 여부를 선택해주세요.')
      return;
    }
    if (prosInput.current.value === '') {
      window.alert('부트캠프의 장점을 입력해주세요.')
      return;
    }
    if (consInput.current.value === '') {
      window.alert('부트캠프의 단점을 입력해주세요.')
      return;
    }
    if (prosInput.current.value.length < 20 || consInput.current.value.length < 20) {
      window.alert('장점과 단점은 각각 20자 이상 입력해주세요.')
      return;
    }
    const new_review = {
      nickname: user_name,
      bootcampName: camp_name,
      status: courseInput.current.value,
      title: titleInput.current.value,
      pros: prosInput.current.value,
      cons: consInput.current.value,
      stars: stars,
    };
    dispatch(campActions.addReviewDB(new_review));
  };

  return (
    <React.Fragment>
      <Grid className='background' display='flex' backgroundColor='#17181b'>
        {/* 사이드바 */}
        <Sidebar opacity='0.2' TABopacity='0.2' />
        {/* 헤더 포함한 바디 */}
        <Body header opacity='0.2' TABopacity='0.2'>
          <Grid className='body-inner' padding='24px 0 0'>
            <Window>
              {/* 작성 페이지 헤더 */}
              <Grid height='84px' display='flex' borderBottom='1px solid #5f6368' backgroundColor='#202124'>
                {/* 나가기 버튼 */}
                <Grid width='23.33%' padding='0 40px'>
                  <Text fontSize='35px' TABfontSize='28px' color='#e5e5e5' lineHeight='84px' cursor='pointer' _onClick={() => exitPage()}><BsX /></Text>
                </Grid>
                {/* 타이틀 */}
                <Grid width='53.33%' is_center>
                  <Text fontSize='24px' TABfontSize='20px' fontWeight='700' color='#e5e5e5' lineHeight='84px'>{camp_name} 리뷰 작성</Text>
                </Grid>
                {/* 등록 버튼 */}
                <Grid width='23.33%' padding='0 40px'>
                  <Text fontSize='24px' TABfontSize='20px' fontWeight='700' color='#848484' lineHeight='84px' float='right' cursor='pointer' active='color: #7879F1' _onClick={() => addReview()}>등록</Text>
                </Grid>
              </Grid>
              <BodyBox>
                {/* 리뷰 제목 */}
                <div><Text fontSize='18px' fontWeight='700' color='#e8eaed' lineHeight='50px'>제목</Text></div>
                <div><Input placeholder='제목을 입력해주세요' ref={titleInput} /></div>
                {/* 평점 */}
                <div style={{ lineHeight: '32px' }}><Text fontSize='18px' fontWeight='700' color='#e8eaed'>평점</Text></div>
                <div style={{ lineHeight: '32px' }}><Text fontSize='32px' fontWeight='700'><StarRatingComponent name='Stars' onStarClick={(e) => onClickStar(e)} renderStarIcon={() => <IoStar />} starColor='#dadce0' emptyStarColor='#3c4043' /></Text></div>
                {/* 수료 여부 */}
                <div style={{ marginTop: '-8px', lineHeight: '52px' }}><Text fontSize='18px' fontWeight='700' color='#e8eaed'>수료 여부</Text></div>
                <div style={{ marginTop: '-8px' }}>
                  <Select ref={courseInput}>
                    <option value=''>선택해주세요</option>
                    <option value='수강중'>수강중</option>
                    <option value='수료'>수료</option>
                  </Select>
                </div>
                {/* 장점 */}
                <div><Text fontSize='18px' fontWeight='700' color='#e8eaed'>장점<br /></Text><Text fontSize='14px' color='#9AA0A6'>최소 20자</Text></div>
                <div><Textarea rows='5' placeholder={`${camp_name}의 장점을 입력해주세요.
리뷰를 등록한 후에는 수정이나 삭제가 불가하므로, 신중하게 작성해주세요.`} ref={prosInput} /></div>
                {/* 단점 */}
                <div><Text fontSize='18px' fontWeight='700' color='#e8eaed'>단점<br /></Text><Text fontSize='14px' color='#9AA0A6'>최소 20자</Text></div>
                <div><Textarea rows='5' placeholder={`${camp_name}의 단점을 입력해주세요.
리뷰를 등록한 후에는 수정이나 삭제가 불가하므로, 신중하게 작성해주세요.`} ref={consInput} /></div>
              </BodyBox>
            </Window>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Window = styled.div`
  background-color: #282a2d;
  width: 80%;
  max-width: 1044px;
  width: 80%;
  height: fit-content;
  margin: auto;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    position: absolute;
    left: 0;
    margin-left: 40px;
    width: 688px;
  }
`;

const BodyBox = styled.div`
  display: grid;
  padding: 40px 40px 0;
  grid-template-columns: 160px 804px;
  & > div {
    margin-bottom: 40px;
    @media screen and (min-width: 768px) and (max-width: 992px) {
      margin-bottom: 32px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    grid-template-columns: 160px 448px;
  }
`;

const Select = styled.select`
  height: 52px;
  width: 216px;
  border: 1px solid #5f6368;
  box-sizing: border-box;
  background-color: #282A2D;
  padding: 10px;
  font-size: 16px;
  color: #e8eaed;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  border: 1px solid #5f6368;
  width: 400px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #282A2D;
  color: #e5e5e5;
  &::placeholder {
    color: #8f9091;
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid #5f6368;
  width: 750px;
  resize: none;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #282A2D;
  color: #e5e5e5;
  &::placeholder {
    color: #8f9091;
    font-size: 16px;
  }
  &:focus {
    outline: none;
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 400px;
    height: 120px;
  }
`;

export default BootReviewWrite;
