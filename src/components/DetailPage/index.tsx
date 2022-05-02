import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import shoesData from '../../data';

const Inputbar = styled.input`
    width: 200px;
    height: 25px;
    margin: 30px;
`

const DetailPage = () => {

    const [ shoesItems ] = useState(shoesData);
    const [ isAlertHide, setIsAlertHide ] = useState(false);
    const [ inputTarget, setInputTarget ] = useState('');
    const [ itemCount, setItemCount ] = useState(0);

    const handleChange = (e: any) => {
        const regExp = /^[0-9\b -]{0,13}$/;
        if(regExp.test(e.target.value)){
            setInputTarget(e.target.value);
        };
        if(inputTarget !== ( null ||  undefined )){
            setItemCount(e.target.value);
        };
    };

    const addToItem = () => {
        setItemCount(itemCount+1);
    };

    const deleteToItem = () => {
        setInputTarget('');
        setItemCount(0);
    };

    const discountItems = (items: any) => {
        if( isAlertHide === false ){
            return items = items * 1/2;
        }
        else {
            return items;
        }

    };

    useEffect(() => {
        const timer = setTimeout(() => { setIsAlertHide(true) }, 600000);
    
        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className="container">
            {
                isAlertHide === false ?  <div className='alert alert-warning'>6시간 이내 구매시 50% 할인</div> : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt='shoesItem'/>
                </div>
                <div className="col-md-6" style={{padding: '50px'}}>
                    <h4>{shoesItems[0].title}</h4>
                    <p>{shoesItems[0].content}</p>
                    <h6>{discountItems(shoesItems[0].price * itemCount)} 원</h6>
                    <p>기본가(120000원)</p>
                    <Inputbar placeholder="숫자만 입력하세요." type='text' value={inputTarget} onChange={handleChange}/>
                    <p>{itemCount} 개</p>
                    <button className="btn btn-danger" style={{margin: '10px'}} onClick={addToItem}>수량 추가</button>
                    <button className="btn btn-danger" onClick={deleteToItem}>취소</button>
                    <br/>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    );
};

export default React.memo(DetailPage);