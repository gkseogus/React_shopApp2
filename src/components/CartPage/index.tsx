import React, { useTransition } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCount, deleteCount } from './../../store/index'

const CartPage = () => {

    const rootData = useSelector((state: any) => {
        return state.cartState
    })

    const [ isPending, startTransition ] = useTransition();

    const dispatch = useDispatch();

    const testFuc = () => {
        startTransition(() => {
            // 늦게처리되는 로직 넣으면 됨
        })
    }
    return (
        <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    rootData.map((items: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{items.id}</td>
                                <td>{items.name}</td>
                                <td>{items.count}</td>
                                <td>
                                <button style={{ margin: '5px'}} onClick={() => {
                                    dispatch(changeCount(items.id))
                                }}>+</button>
                                <button onClick={() => {
                                    dispatch(deleteCount(items.id))
                                }}>-</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table> 
    );
};

export default React.memo(CartPage);