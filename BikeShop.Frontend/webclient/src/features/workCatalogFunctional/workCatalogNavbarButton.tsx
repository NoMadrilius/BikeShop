/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import FileSystemNavigator from 'shared/ui/workCatalogButton/workCatalogTree';
import ButtonWC from 'shared/ui/workCatalogButton/workCatalogButton';

const WCnavbar: React.FC = () => {
  const test = () => {
    alert('jkrvhklersb');
  };
  const test2 = () => {
    alert('Категория 2');
  };

  return (
    <div>
      <FileSystemNavigator test={test} test2={test2}/>  
    </div>
  );
};

export default WCnavbar;
