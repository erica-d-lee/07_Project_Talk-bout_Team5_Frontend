import React, { useRef } from 'react';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import { Sidebar, Body } from '../components';
import { history } from '../redux/ConfigureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as campActions } from '../redux/modules/bootcamp';
import { actionCreators as imageActions } from '../redux/modules/image';
import { BsX } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { FiHash } from 'react-icons/fi';
import { getCookie } from '../shared/cookie';

const BootCommuWrite = (props) => {
  const dispatch = useDispatch();

  // 로그인 상태일 때 리덕스에서 닉네임 가져오기
  // const username = useSelector(state => state.user.user.nickname);
  const username = getCookie('nickname');

  const edited_id = parseInt(props.match.params.id);
  const commu_found = useSelector((state) => state.bootcamp.one_commu);
  const image_url = useSelector((state) => state.image.image_url);

  const titleRef = useRef('');
  const contentRef = useRef('');

  // 이미지 업로드
  const imageRef = useRef();
  const preview = useSelector((state) => state.image.preview);
  // 이미지 미리보기 실행 및 서버 업로드 함수
  const selectFile = (e) => {
    const uploaded_image = imageRef.current.files[0];
    const formData = new FormData();
    formData.append('image', uploaded_image);
    dispatch(imageActions.getPreview(e));
    dispatch(imageActions.uploadImageDB(formData));
  };
  // 이미지 미리보기 삭제 함수
  const exitPage = () => {
    if (window.confirm('변경사항이 저장되지 않을 수 있습니다.')) {
      history.goBack();
      dispatch(imageActions.getPreview(null));
    }
  };

  // 게시글 등록(수정)
  const addPost = () => {
    if (titleRef.current.value === '') {
      window.alert('제목을 입력해주세요.');
      return;
    }
    if (contentRef.current.value === '') {
      window.alert('내용을 입력해주세요.');
      return;
    }
    if (edited_id) {
      const edited_image = preview ? image_url : commu_found.image
      const edited_commu = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        bootcampName: commu_found.bootcampName,
        communityId: commu_found.communityId,
        image: edited_image,
      };
      dispatch(campActions.editCommuDB(edited_commu));
      dispatch(imageActions.getPreview(null));
      dispatch(imageActions.DeleteImageUrl());
      titleRef.current.value = '';
      contentRef.current.value = '';
    } else {
      const new_commu = {
        nickname: username,
        bootcampName: props.location.state.camp_name,
        title: titleRef.current.value,
        content: contentRef.current.value,
        image: image_url,
      };
      dispatch(campActions.addCommuDB(new_commu));
      dispatch(imageActions.getPreview(null));
      dispatch(imageActions.DeleteImageUrl());
      titleRef.current.value = '';
      contentRef.current.value = '';
    }
  };

  return (
    <React.Fragment>
      <Grid
        className="background"
        display="flex"
        backgroundColor="#17181b"
        padding="0 0 42px"
      >
        {/* 사이드바 */}
        <Sidebar opacity='0.2' TABopacity='0.2' />
        {/* 헤더 포함한 바디 */}
        <Body header opacity='0.2' TABopacity='0.2'>
          <Grid className="body-inner" padding="24px 0 0">
            <Window>
              {/* 작성 페이지 헤더 */}
              <Grid
                height="84px"
                display="flex"
                borderBottom="1px solid #5f6368"
                backgroundColor='#202124'
              >
                {/* 나가기 버튼 */}
                <Grid width="23.33%" padding="0 40px">
                  <Text
                    fontSize="35px"
                    TABfontSize='28px'
                    color="#e5e5e5"
                    lineHeight="84px"
                    cursor="pointer"
                    _onClick={() => {
                      exitPage();
                    }}
                  >
                    <BsX />
                  </Text>
                </Grid>
                {/* 타이틀 */}
                <Grid width="53.33%" is_center>
                  <Text
                    fontSize="24px"
                    TABfontSize='20px'
                    fontWeight="700"
                    color="#e5e5e5"
                    lineHeight="84px"
                  >
                    글쓰기
                  </Text>
                </Grid>
                {/* 등록(수정) 버튼 */}
                <Grid width="23.33%" padding="0 40px">
                  <Text
                    fontSize="24px"
                    TABfontSize='20px'
                    fontWeight="700"
                    color="#848484"
                    lineHeight="84px"
                    float="right"
                    cursor="pointer"
                    _onClick={() => addPost()}
                  >
                    {edited_id ? '수정' : '등록'}
                  </Text>
                </Grid>
              </Grid>
              <BodyBox>
                {/* 제목 입력 칸 */}
                <TitleBox>
                  <Input
                    placeholder="제목을 입력해주세요"
                    ref={titleRef}
                    defaultValue={edited_id ? commu_found.title : null}
                  />
                </TitleBox>
                {/* 내용 입력 칸 */}
                {/* 이미지 preview가 있으면 입력 칸 크기 줄이고, preview와 파일명을 보여주기*/}
                {/* 글 수정 중이라면 저장된 제목과 내용 보여주기 */}
                <ContentBox>
                  <Textarea
                    rows={preview ? '5' : '15'}
                    placeholder="내용을 입력해주세요"
                    ref={contentRef}
                    defaultValue={edited_id ? commu_found.content : null} />
                </ContentBox>
                {preview ?
                  <div style={{ textAlign: 'center' }}>
                    <Preview>
                      <Img src={preview} />
                    </Preview>
                    <Text
                      p
                      fontSize="16px"
                      color="#5f6368"
                      margin="0 auto 80px"
                    >
                      {preview ? imageRef.current.files[0].name : ''}
                    </Text>
                  </div>
                  : ''}
              </BodyBox>
              {/* 작성 페이지 푸터 */}
              <FooterBox>
                {/* 이미지 추가 버튼 */}
                <form>
                  <label for="file">
                    <Text
                      fontSize="24px"
                      color="#b3b3b3"
                      margin="0 32px 0 0"
                      cursor="pointer"
                    >
                      <BiImageAdd />
                    </Text>
                    <ImgInput
                      type="file"
                      ref={imageRef}
                      onChange={selectFile}
                      accept="image/*"
                      id="file"
                    />
                  </label>
                </form>
                {/* 해시태그 추가 버튼 */}
                <Text fontSize="24px" color="#b3b3b3" cursor="pointer">
                  {/* <FiHash /> */}
                </Text>
              </FooterBox>
            </Window>
          </Grid>
        </Body>
      </Grid>
    </React.Fragment>
  );
};

const Window = styled.div`
  background-color: #282a2d;
  max-width: 1044px;
  width: 80%;
  height: fit-content;
  margin: auto;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    position: absolute;
    width: 80%;
  }
`;

const BodyBox = styled.div`
  padding: 0 40px;
`;

const TitleBox = styled.div`
  height: 72px;
  border-bottom: 1px solid #5f6368;
`;

const ContentBox = styled.div`
  height: fit-content;
  margin: 0 0 80px;
`;

const Input = styled.input`
  background-color: #282a2d;
  padding: 24px;
  font-size: 16px;
  color: #dadce0;
  width: 97.7%;
  border: none;
  &::placeholder {
    color: #5f6368;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 97.7%;
  resize: none;
  padding: 24px;
  font-size: 16px;
  background-color: #282a2d;
  border: none;
  color: #dadce0;
  &::placeholder {
    color: #5f6368;
    font-size: 1.7vh;
  }
  &:focus {
    outline: none;
  }
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #5f6368;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const Preview = styled.div`
  width: 884px;
  height: 500px;
  border: 1px solid #5f6368;
  box-sizing: border-box;
  text-align: center;
  object-fit: cover;
  overflow: hidden;
  margin: 0 auto 16px;
  @media screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    height: 540px;
  }
`;

const Img = styled.img`
  overflow: hidden;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FooterBox = styled.div`
  background-color: #2e3134;
  height: 24px;
  padding: 28px 40px;
  display: flex;
`;

// 이미지 파일 선택하는 기본 버튼 숨기기
const ImgInput = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
`;

export default BootCommuWrite;