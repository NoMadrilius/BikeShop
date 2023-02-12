import React from 'react';
import {IProductTag} from "../../../entities";
import TreeItem from "@mui/lab/TreeItem";
import useTagTreeView from "./TagTreeViewStore";

const TagTreeViewNodes = () => {

    const treeViewData = useTagTreeView(s => s.treeViewTags)
    const setSelected = useTagTreeView(s => s.setSelectedTag)
    const setContextVisible = useTagTreeView(s => s.setContextMenuVisible)
    const visibility = useTagTreeView(s => s.contextMenuVisible)

    function createTree(parentId: string = '0') {
        const nodesToAdd: IProductTag[] = [];

        if (treeViewData.length > 0) {
            treeViewData.map((n) => {
                if (n.parentId == parentId) nodesToAdd.push(n);
            });
        }

        if (nodesToAdd.length > 0) {
            return nodesToAdd?.map((n) => {
                return (
                    <TreeItem
                        onContextMenu={(event) => {

                            console.log(visibility)
                            setContextVisible(true, event.clientX, event.clientY)
                            console.log(visibility)

                            //setSelected(n.id.toString())

                        }}
                        nodeId={n.id.toString()}
                        label={n.name} key={n.id}>
                        {createTree(n.id)}
                    </TreeItem>
                );
            });
        }
    }

    return (
        <div>
            {createTree()}
        </div>
    );
};

export default TagTreeViewNodes;