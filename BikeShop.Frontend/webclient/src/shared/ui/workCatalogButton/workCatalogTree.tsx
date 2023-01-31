/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */
import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ButtonWC from './workCatalogButton';

export default function FileSystemNavigator(props: any) {
  return (
    <TreeView
      aria-label="file system navigator"
      sx={{ height: 450, flexGrow: 2, maxWidth: 500, overflowY: 'auto', padding: 1 }}
    >
      <TreeItem nodeId="1" label={<ButtonWC text="Категория 1" />}>
        <TreeItem sx={{ marginTop: 1 }} nodeId="2" label={<ButtonWC text="под категория 1" navigation={props.test}/>} />
        <TreeItem sx={{ marginTop: 1 }} nodeId="8" label={<ButtonWC text="под категория 2" />} />
      </TreeItem>
      <TreeItem sx={{ marginTop: 1 }} nodeId="5" label={<ButtonWC text="Категория 2" />}>
        <TreeItem sx={{ marginTop: 1 }} nodeId="10" label={<ButtonWC text="под категория 3"navigation={props.test2}/>} />
        <TreeItem sx={{ marginTop: 1 }} nodeId="6" label={<ButtonWC text="под категория 4" />} />
      </TreeItem>
      <TreeItem sx={{ marginTop: 1 }} nodeId="11" label={<ButtonWC text="Категория 3" />} />
      <TreeItem sx={{ marginTop: 1 }} nodeId="12" label={<ButtonWC text="Категория 4" />} />
      <TreeItem sx={{ marginTop: 1 }} nodeId="13" label={<ButtonWC text="Категория 5" />} />
    </TreeView>
  );
}
