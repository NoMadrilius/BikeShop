import React from 'react';
import TableRow from "@mui/material/TableRow";
import {columns, Data} from "./productCatalogTableConfig";
import TableCell from "@mui/material/TableCell";
import useProductCatalogTableStore from "./productCatalogTableStore";

interface props {
    row: Data
}

export const ProductCatalogTableRow = (props: props) => {

    const setSelected = useProductCatalogTableStore(s => s.setSelectedRows)
    const selected = useProductCatalogTableStore(s => s.selectedRows)
    const isSelected = useProductCatalogTableStore(s => s.isRowSelected)
    const setOpenContext = useProductCatalogTableStore(s => s.setOpen);

    return (
        <TableRow
            onContextMenu={(event) => {
                setSelected([props.row.id])
                setOpenContext(true, event.clientX, event.clientY)
            }}

            selected={isSelected(props.row.id)}

            onClick={() => {
                setSelected([props.row.id])
            }}

            hover
            role="checkbox"
            tabIndex={-1}
            key={props.row.id}
        >
            {columns.map((column) => {
                const value = props.row[column.id];
                return (
                    <TableCell key={column.id} align={column.align}>
                        {value}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};