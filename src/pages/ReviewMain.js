import React from 'react';
import styled from 'styled-components';
import {Button, Grid, Image, Input, Text} from '../elements';
import Header from '../components/Header';

const ReviewMain = (props) => {

  return (
    <React.Fragment>
      <Grid>
        <Header />
        <Grid is_center backgroundColor='#e5e5e5' height='25vh' padding='9vh 0'>
          <Text fontSize='3vh' fontWeight='700'>부트캠퍼들의 속 시원한 이야기</Text>
          <Text p fontSize='1.5vh' margin='5px'>부트캠퍼들이 평가하는 부트캠프는 어떤지 확인해보세요.</Text>
        </Grid>
        <Grid is_center>
          <CardList>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, idx) => {
              return (
                <Card>
                  <ImageDiv>
                    <Text fontSize='2.5vh'>LOGO</Text>
                  </ImageDiv>
                  <Text p fontSize='1.6vh' fontWeight='700' margin='3vh 0 0'>스파르타코딩클럽</Text>
                  <Text fontSize='1.2vh' color='#aaa' margin='1px 0 0'>99일 만에 진짜 개발자가 되는 법</Text>
                  <Text p fontSize='1.5vh'>★★☆☆☆ 2.2</Text>
                </Card>
              )
            })}
          </CardList>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const CardList = styled.div`
  width: 60%;
  height: 100%;
  margin: 5vh auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled.div`
  background-color: #e5e5e5;
  width: 33.33%;
  height: 33.33%;
  border: 0.5vh solid white;
  margin: 0;
  box-sizing: border-box;
  padding: 5vh 1vw 0;
  text-align: left;
`;

const ImageDiv = styled.div`
  text-align: center;
`;

export default ReviewMain;