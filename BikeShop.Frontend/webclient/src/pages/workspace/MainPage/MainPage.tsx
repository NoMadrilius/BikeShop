import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import s from "./MainPage.module.scss";
import {Button} from '../../../shared/ui';
import {ChooseClientModal, PayModal} from '../../../features';
import usePayModal from '../../../features/PayModal/PayModalStore';
import useChooseClientModal from "../../../features/ChooseClientModal/ChooseClientModalStore";
import {BikeShopPaths} from "../../../app/routes/paths";
import {IUser} from "../../../entities";
import useMainPageStore from "./MainPageStore";
import CreateProductModal from "../../../features/CreateProductModal/CreateProductModal";

const MainPage = () => {

    const navigate = useNavigate();

    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const setPayModal = usePayModal(s => s.setPayModal)
    const setIsClientChosen = useMainPageStore(s => s.setIsClientChosen)

    // const setServiceUser = useService(s => s.setCurrentUser)
    const user = useMainPageStore(s => s.user)
    const setUser = useMainPageStore(s => s.setUser)

    const [tasks, setTasks] = useState([
        {id: 1, task: 'task 01'},
        {id: 2, task: 'task 02'},
        {id: 3, task: 'task 03'},
        {id: 4, task: 'task 04'},
        {id: 5, task: 'task 05'},
        {id: 6, task: 'task 06'},
        {id: 7, task: 'task 07'},
        {id: 8, task: 'task 08'},
        {id: 9, task: 'task 09'},
        {id: 10, task: 'task 10'},
    ])

    const chooseClientHandler = (user: IUser) => {
        // setServiceUser(user)
        setUser(user)
        setIsClientChosen(true)
        setChooseClientModal(false)
        console.log('MainPage click user', user)
    }

    const createServiceHandler = () => {
        setChooseClientModal(true)
    }
    // update commit
    return (
        // <div className={s.mainPageWrapper}>
        <div className={s.mainPageMainBlock}>
            <CreateProductModal/>
            <div className={s.mainPage_header}>
                <div className={s.mainPage_header_leftSide}>
                    <div className={s.header_leftSide_deal}>
                        <Button onClick={() => {}}>
                            ?????????????? ??????????
                        </Button>
                        <Button onClick={() => {}}>
                            ???????????????? ???????????????? ??????????????
                        </Button>
                        <Button onClick={() => {navigate(BikeShopPaths.WORKSPACE.SERVICE)}}>
                            ??????????????
                        </Button>
                        <Button onClick={() => {}}>
                            ????????????
                        </Button>
                        <Button onClick={() => {}}>
                            ???????????? ???? ????????
                        </Button>
                    </div>
                    <div className={s.header_leftSide_info}>
                        <Button onClick={() => navigate(BikeShopPaths.WORKSPACE.PRODUCT_CATALOG)}>
                            ?????????????? ??????????????
                        </Button>
                        <Button onClick={() => {}}>
                            ????????
                        </Button>
                        <Button onClick={() => {}}>
                            ????????????
                        </Button>
                        <Button onClick={() => {}}>
                            ??????????????
                        </Button>
                        <Button onClick={() => {}}>
                            ?????????? ????????????????
                        </Button>
                        <Button onClick={() => {}}>
                            ??????????????????????
                        </Button>
                    </div>
                </div>

                <div className={s.mainPage_header_rightSide}>
                    ?????????? ?????????? ??????-???? ????????????????????
                </div>
            </div>


            <div className={s.mainPage_content}>
                <div className={s.content_leftSide}>
                    <div className={s.leftSide_title}>
                        ???????????????????????? ??????????????
                    </div>
                    <div className={s.leftSide_tasks}>
                        {
                            tasks.map(t => {
                                return (
                                    <div key={t.id} className={s.tasks_taskItem}>{t.task}</div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={s.content_rightSide}>
                    <div className={s.rightSide_top}>
                        <div className={s.rightSide_top_search}>
                            <ChooseClientModal extraCallback={(user: IUser) => {
                                chooseClientHandler(user)
                            }}/>
                            <Button buttonDivWrapper={s.search_chooseClientButton}
                                    onClick={() => {
                                        setChooseClientModal(true)
                                    }}
                            >
                                ?????????????? ??????????????
                            </Button>
                            <div className={s.search_searchInput}>
                                {user.lastName} {user.firstName} {user.patronymic}
                            </div>
                        </div>

                        <div className={s.rightSide_top_info}>
                            ?????????????????? ????????????
                        </div>

                        <div className={s.rightSide_top_result}>
                            <Button buttonDivWrapper={s.result_chooseCashboxBtn}
                                    onClick={() => {navigate(BikeShopPaths.WORKSPACE.CASHBOX)}}>
                                ?????????????? ??????????
                            </Button>
                            <Button buttonDivWrapper={s.result_cancelBtn}
                                    onClick={() => {}}>
                                X
                            </Button>
                            <div className={s.result_span}>
                                ????????
                            </div>
                            <PayModal/>
                            <Button buttonDivWrapper={s.result_payBtn}
                                    onClick={() => {setPayModal(true)}}>
                                ?? ????????????
                            </Button>
                        </div>
                    </div>

                    <div className={s.rightSide_bottom}>
                        <div className={s.bottom_left}>
                            <div>??????????</div>
                            <div>??????????</div>
                            <div>??????????</div>
                        </div>

                        <div className={s.bottom_right}>
                            <div className={s.bottom_right_one}>
                                <div>??????????</div>
                                <div>120:47:32</div>
                            </div>
                            <div className={s.bottom_right_two}>
                                <Button buttonDivWrapper={s.right_two_button}
                                        onClick={() => {}}>
                                    ?????????????????? ??????????
                                </Button>
                                <div className={s.right_two_span}>
                                    ?????????????????? ??????????
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        // </div>
    );
};

export default MainPage;
