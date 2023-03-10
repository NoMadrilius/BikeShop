import React from 'react';
import {ProductCatalogTable, ProductTagCloud, TagTreeView} from "../../../widgets";
import {Button, InputUI} from '../../../shared/ui';
import s from './ProductCatalog.module.scss';

export const ProductCatalog = () => {
    return (
        // <div className={s.productCatalogTableWrapper}>
        <div className={s.productCatalogTable_mainBlock}>
            <div className={s.productCatalogTable_leftSide}>
                <div className={s.leftSide_header}>
                    <ProductTagCloud/>
                </div>
                <div className={s.leftSide_tree}>
                    <TagTreeView/>
                </div>
            </div>

            <div className={s.productCatalogTable_rightSide}>
                <div className={s.rightSide_searchRow}>
                    <div className={s.searchRow_chooseBtn}>
                        <Button onClick={() => {
                        }}>
                            Отображение
                        </Button>
                    </div>
                    <div className={s.searchRow_searchInput}>
                        <InputUI placeholder={'Поиск...'} clearInputValue={() => {
                        }}/>
                    </div>
                    <div className={s.searchRow_allProductsBtn}>
                        <Button onClick={() => {
                        }}>
                            Все товары
                        </Button>
                    </div>
                    <div className={s.header_notSortedBtn}>
                        <Button onClick={() => {
                        }}>
                            Неотсортированные
                        </Button>
                    </div>
                </div>

                <div className={s.rightSide_table}
                     onContextMenu={(event) => {
                         event.preventDefault()
                     }}
                >
                    <ProductCatalogTable/>
                </div>
            </div>
        </div>
        // </div>
    );
};