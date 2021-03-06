import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import shoesData  from '../../data.js';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

const MoreBtn = styled.button`
    margin: 20px;
    height: 50px;
    width: 100px;
`

const MainContents = () => {

    const [ shoesItems, setShoesItems ] = useState(shoesData);
    const [ btnCount, setBtnCount ] = useState(0);

    // 실시간 요청에 유용함
    const apiGet = useQuery('apiGet', () => {
        return axios.get('').then((a) => {
            return a.data
        })
    })

    const navigate = useNavigate();

    const getApi = () => {
        setBtnCount(btnCount+1);
        
        if(btnCount === 0) {
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((ApiData) => {
                setShoesItems( [...shoesItems, ...ApiData.data]);
            }).catch(() => {
                alert('api 요청 실패');
            });
        }
        else if(btnCount === 1){
            axios.get('https://codingapple1.github.io/shop/data3.json')
            .then((ApiData) => {
                setShoesItems( [...shoesItems, ...ApiData.data]);
            }).catch(() => {
                alert('api 요청 실패');
            });
        }
        else if(btnCount >= 2 ){
            alert('상품이 존재하지 않습니다.');
        }
    };

    return (
        <div>
            <h1>사진 클릭 시 Detail 페이지로 이동</h1>
            <div>최근 본 상품 이름: {localStorage.getItem('watched')}</div>
            <div>
                { apiGet.isLoading ? '로딩중' :  apiGet.data.name }
            </div>
            {
                shoesItems.map((items: any, index) => {
                    return(
                        <Container key={index}>
                            <Row>
                                <Col xs={{ order: 12 }}>
                                    <img src={`https://codingapple1.github.io/shop/shoes${items.id}.jpg`} 
                                    alt='shoesItem' width='40%' onClick={() => { navigate('/detail');
                                    localStorage.setItem('watched', items.title)}}/>
                                    <h4>{items.title}</h4>
                                    <p>{items.content}</p>
                                    <p>{items.price}</p>
                                </Col>
                            </Row>
                        </Container>
                    );
                })
            }
            <MoreBtn onClick={getApi}>더보기</MoreBtn>
        </div>
    );
};


export default React.memo(MainContents);