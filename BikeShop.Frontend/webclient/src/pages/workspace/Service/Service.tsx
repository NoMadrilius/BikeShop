import React, {useEffect, useState, ChangeEvent} from 'react';
import s from './Service.module.scss'
import style from '../../../shared/ui/Button/Button.module.scss'
import {ChooseClientModal} from '../../../features';
import {Button, ControlledInput} from '../../../shared/ui';
import {ServiceTable} from '../../index';
import useChooseClientModal from '../../../features/ChooseClientModal/ChooseClientModalStore';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useSnackbar} from 'notistack';
import useService, {ServiceListStatusType} from './ServiceStore';
import {Errors} from '../../../entities/errors/workspaceErrors';
import {ClientCard} from '../../../widgets';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import {CreateService, IUser, ServiceItem} from '../../../entities';
import {ServiceStatusType} from "../../../entities/models/ServiceItem";

// enum ServiceStatus {
//     Waiting = 0, // ожидают
//     InProcess = 1, // в ремонте
//     WaitingSupply = 2, // ждёт поставки
//     Ready = 3, // готово
//     Ended = 4, // выдать велосипед
//     Canceled = 5, // отменен
//     Deleted = 6 // удален
// }

// export const ServiceStatuses = {
//     Waiting: 'Waiting', // ожидают
//     InProcess: 'InProcess', // в ремонте
//     WaitingSupply: 'WaitingSupply', // ждёт поставки
//     Ready: 'Ready', // готово
//     Ended: 'Ended', // выдать велосипед
//     Canceled: 'Canceled', // отменен
//     Deleted: 'Deleted' // удален
// }

const Service = () => {

    const {enqueueSnackbar} = useSnackbar()

    const setChooseClientModal = useChooseClientModal(s => s.setChooseClientModal)
    const isLoading = useService(s => s.isLoading)
    const isClientChosen = useChooseClientModal(s => s.isClientChosen)
    const setIsClientChosen = useChooseClientModal(s => s.setIsClientChosen)

    const currentUser = useService(s => s.currentUser)
    const setCurrentUser = useService(s => s.setCurrentUser)
    const currentService = useService(s => s.currentService)
    const setCurrentService = useService(s => s.setCurrentService)

    const users = useService(s => s.users)
    const services = useService(s => s.services)
    const filteredServices = useService(s => s.filteredServices)
    const setFilteredServices = useService(s => s.setFilteredServices)
    const setServiceListStatus = useService(s => s.setServiceListStatus)

    const products = useService(s => s.products)
    const works = useService(s => s.works)

    const getAllServicesInfo = useService(s => s.getAllServicesInfo)
    const addNewService = useService(s => s.addNewService)
    const updateService = useService(s => s.updateService)
    const updateServiceStatus = useService(s => s.updateServiceStatus)

    // для стилей кнопок фильтрации
    const [isActiveWaiting, setIsActiveWaiting] = useState<boolean>(false)
    const [isActiveProcess, setIsActiveProcess] = useState<boolean>(false)
    const [isActiveReady, setIsActiveReady] = useState<boolean>(false)

    // для стилей выбранного элемента
    const [activeId, setActiveId] = useState<number | null>(null)

    // тестовые данные
    // const [productsItem, setProductsItem] = useState([
    //     {id: 1, title: 'Колесо', price: 25, count: 3},
    //     {id: 2, title: 'Велосипед', price: 25000000, count: 1},
    //     {id: 3, title: 'Руль', price: 250, count: 2},
    //     {id: 4, title: 'Рама', price: 500, count: 1},
    //     {id: 5, title: 'Вилка', price: 1000, count: 1},
    //     {id: 6, title: 'Втулка', price: 2000, count: 1},
    //     {id: 7, title: 'Вынос', price: 1500, count: 1},
    // ])
    // const [repairItems, setRepairItems] = useState([
    //     {id: 1, title: 'Замена покрышки', price: 25, count: 3},
    //     {id: 2, title: 'Сезонное ТО', price: 2500, count: 1},
    //     {id: 3, title: 'Переспицовка колеса', price: 250, count: 2},
    // ])

    // сбор данных с формы
    const formControl = useForm({
        defaultValues: {
            name: '',
            clientDescription: '',
            userMaster: '',
        }
    });
    const onSubmit: SubmitHandler<any> = (data: CreateService) => {
        console.log('сабмит данные', data)

        data.shopId = 1
        data.clientId = currentUser.id
        data.userCreatedId = 'e9267875-5844-4f12-9639-53595d3105f4' // выбор из селекта
        data.userMasterId = currentUser.id

        data.productDiscountId = 0
        data.workDiscountId = 0

        data.serviceWorks = [
            {
                name: 'string',
                description: 'string',
                quantity: 0,
                quantityUnitId: 0,
                price: 0,
                discount: 0,
                total: 0,
                userId: currentUser.id
            }
        ]
        data.serviceProducts = [
            {
                catalogKey: 'string',
                serialNumber: 'string',
                name: 'string',
                quantity: 0,
                quantityUnitId: 0,
                price: 0,
                discount: 0,
                total: 0,
                userId: currentUser.id
            }
        ]

        addNewService(data).then((response) => {
            clearInputsHandler()
            enqueueSnackbar('Ремонт добавлен', {variant: 'success', autoHideDuration: 3000})
        }).catch((error: any) => {
            let message = error(error.response.data.errorDescription).toString()
            formControl.setError('name', {type: 'serverError', message: message})
            enqueueSnackbar(message, {variant: 'error', autoHideDuration: 3000})
            console.error(error.response.data)
        })

        // updateService(data).then((response) => {}
    }
    const clearInputsHandler = () => {
        formControl.setValue('name', '')
        formControl.setValue('clientDescription', '')
        formControl.setValue('userMaster', '')
    }
    
    // хендлеры
    const chooseServiceItem = (ServiceItemObj: ServiceItem) => {
        // поиск элемента из массива для применения стилей
        const activeElement = filteredServices.find(item => item.id === ServiceItemObj.id)
        activeElement && setActiveId(ServiceItemObj.id)

        // сетаем данные в стор при выборе
        setCurrentService(ServiceItemObj)
        console.log('клик по сервису', ServiceItemObj)
        // надо будет убрать слайс!!!
        setCurrentUser(users.slice(1).find(u => u.id === ServiceItemObj.client.id))
        console.log('клиент выбранного сервиса', currentUser)
        setIsClientChosen(true)

        formControl.setValue('name', ServiceItemObj.name)
        formControl.setValue('clientDescription', ServiceItemObj.clientDescription)
        formControl.setValue('userMaster', 'Выбранный мастер')
    }
    const chooseClientHandler = (user: IUser) => {
        setCurrentUser(user)
        setIsClientChosen(true)
        setChooseClientModal(false)
        console.log('выбранный клиент из модалки', user)
    }

    // const handleChangeSelect = (event: SelectChangeEvent) => {
    //     setUserMasterId(event.target.value as string)
    //     console.log(event.target.value)
    // };
    // const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    //     // setUserMasterId(event.target.value as string)
    //     console.log('клик по селекту', event.target.value)
    // };


    const filterServicesUniversalHandler = (filterName: ServiceListStatusType, /*serviceListStatus: ServiceListStatusType,*/
                                            isButtonWaitingOn: boolean, isButtonInProcessOn: boolean,
                                            isButtonReadyOn: boolean, extraFilterName?: ServiceStatusType) => {

        setFilteredServices(services.filter(serv => serv.status === filterName || serv.status === extraFilterName))
        setServiceListStatus(filterName) // статус фильтр листа
        setIsActiveWaiting(isButtonWaitingOn)
        setIsActiveProcess(isButtonInProcessOn)
        setIsActiveReady(isButtonReadyOn)
        // console.log('отфильтрованные сервисы', filteredServices)
    }

    // изменение статуса заказа
    const updateServiceStatusHandler = (newStatus: ServiceStatusType) => {
        updateServiceStatus({id: currentService?.id || -1, status: newStatus})

        // зачистка полей после изменения статуса
        // setCurrentUser({})
        setCurrentService(null)
        setActiveId(null)
        clearInputsHandler()
    }

    // первый рендер
    useEffect(() => {
        getAllServicesInfo()
        setIsActiveWaiting(true) // цвет кнопки (ожидание)
    }, [])

    return (
        // <div className={s.serviceWrapper}>
        <form onSubmit={formControl.handleSubmit(onSubmit)}>
            <div className={s.serviceBlock}>

                <div className={s.service_leftSide}>
                    <div className={s.leftSide_buttons}>
                        <ChooseClientModal extraCallback={(user: IUser) => {chooseClientHandler(user)}}/>
                        <div className={s.buttons_create}>
                            <Button disabled={isClientChosen}
                                    onClick={() => {alert('Пока что не знаю что с этим делать')}}
                            >
                                Создать ремонт
                            </Button>
                        </div>
                    </div>
                    <div className={s.leftSide_content}>
                        <div className={s.buttons_filter}>
                            <div>
                                <Button className={isActiveWaiting ? style.waiting : ''}
                                        onClick={() => {filterServicesUniversalHandler('Waiting',
                                            true, false, false,
                                            'WaitingSupply')}}
                                >
                                    Ожидают
                                </Button>
                            </div>
                            <div>
                                <Button className={isActiveProcess ? style.process : ''}
                                        onClick={() => {filterServicesUniversalHandler('InProcess',
                                            false, true, false)}}
                                >
                                    В ремонте
                                </Button>
                            </div>
                            <div>
                                <Button className={isActiveReady ? style.ready : ''}
                                        onClick={() => {filterServicesUniversalHandler('Ready',
                                            false, false, true)}}
                                >
                                    Готово
                                </Button>
                            </div>
                        </div>
                        <div className={s.content_title}>
                            {
                                isActiveWaiting &&
                                <div className={s.content_startBtn}>
                                    <Button disabled={!isClientChosen}
                                            onClick={() => {updateServiceStatusHandler('InProcess')}}>
                                        Начать ремонт
                                    </Button>
                                </div>
                            }

                            {
                                isActiveProcess &&
                                <div className={s.content_inProcessButtons}>
                                    <Button disabled={!isClientChosen}
                                            onClick={() => {updateServiceStatusHandler('WaitingSupply')}}>
                                        Остановить ремонт
                                    </Button>
                                    <Button disabled={!isClientChosen}
                                            onClick={() => {updateServiceStatusHandler('Ready')}}>
                                        Закончить ремонт
                                    </Button>
                                </div>
                            }

                            {
                                isActiveReady &&
                                <div className={s.content_doneButtons}>
                                    <Button disabled={!isClientChosen}
                                            onClick={() => {updateServiceStatusHandler('InProcess')}}>
                                        Продолжить ремонт
                                    </Button>
                                    <Button disabled={!isClientChosen}
                                            onClick={() => {updateServiceStatusHandler('Ended')}}>
                                        Выдать велосипед
                                    </Button>
                                </div>
                            }
                        </div>
                        <div className={s.content_info}>
                            {
                                isLoading ? <div>Загрузка...</div> :

                                    filteredServices.length === 0 ? <div>Список пуст</div> :

                                        filteredServices.map(service => {
                                            return (
                                                <div key={service.id}
                                                     // className={service.id === activeId ? s.serviceItem_active : serviceItem}
                                                     className={service.id === activeId ? s.serviceItem_active :
                                                         service.status === 'WaitingSupply' ? s.serviceItem_WaitingSupply : s.serviceItem}
                                                     onClick={() => {chooseServiceItem(service)}}
                                                >
                                                    {service.name}
                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>
                </div>


                <div className={s.service_rightSide}>
                    <div className={s.rightSide_stuffInput}>
                        <ControlledInput name={'name'} label={'Техника'}
                                         control={formControl}
                                         rules={{required: Errors[0].name}}
                        />
                    </div>
                    <div className={s.rightSide_infoFields}>
                        <div className={s.infoFields_content}>
                            <div className={s.content_detailsInput}>
                                <ControlledInput name={'clientDescription'} label={'Детальное описание'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />
                            </div>
                            <div className={s.content_masterInput}>
                                <ControlledInput name={'userMaster'} label={'Мастер'}
                                                 control={formControl}
                                                 rules={{required: Errors[0].name}}
                                />

                                {/*<FormControl fullWidth>*/}
                                {/*    <InputLabel id="master-select-label">Мастер</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        labelId="master-select-label"*/}
                                {/*        id="master-select"*/}
                                {/*        name={'userMasterDescription'}*/}
                                {/*        value={userMasterDescription}*/}
                                {/*        label="userMasterDescription"*/}
                                {/*        onChange={handleChangeSelect}*/}
                                {/*    >*/}
                                {/*        /!*<MenuItem value={10}>10%</MenuItem>*!/*/}
                                {/*        /!*<MenuItem value={20}>20%</MenuItem>*!/*/}
                                {/*        */}
                                {/*        {*/}
                                {/*            users.map(u => {*/}
                                {/*                return (*/}
                                {/*                    <MenuItem key={u.user.id} value={u.user.id}>*/}
                                {/*                        {u.user.lastName} {u.user.firstName} {u.user.patronymic}*/}
                                {/*                    </MenuItem>*/}
                                {/*                )*/}
                                {/*            })*/}
                                {/*        }*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}

                                {/*<select name="userMasterId" value={userMasterId} onChange={handleChangeSelect}>*/}
                                {/*    {*/}
                                {/*        users.map(u => {*/}
                                {/*            return (*/}
                                {/*                <option key={u.user.id} value={u.user.id}>*/}
                                {/*                    {u.user.lastName} {u.user.firstName} {u.user.patronymic}*/}
                                {/*                </option>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</select>*/}

                            </div>
                            <div className={s.content_buttons}>
                                <div className={s.content_saveBtn}>
                                    <Button type={'submit'} disabled={!isClientChosen}>
                                        Сохранить
                                    </Button>
                                </div>
                                <div className={s.content_sumField}>
                                    Сумма
                                </div>
                            </div>
                        </div>
                        <div className={s.infoFields_clientCard}>
                            <ClientCard user={currentUser}/>
                            <div className={s.clientCard_changeClientBtn}>
                                <Button onClick={() => {setChooseClientModal(true)}}>
                                    Выбрать клиента
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={s.rightSide_tables}>
                        <ServiceTable data={products}/>
                        <ServiceTable data={works}/>
                    </div>
                </div>

            </div>
        </form>
        // </div>
    );
};
export default Service;
