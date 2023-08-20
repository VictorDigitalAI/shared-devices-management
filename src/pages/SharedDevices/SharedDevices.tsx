import './SharedDevices.scss';
import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {DotActionToolbar, DotIcon, DotInputText, DotTable, DotTypography} from '@digital-ai/dot-components';
import {useSelector} from 'react-redux';

const SharedDevices = () => {

    const sharedDevices = useSelector((state: any) => state.sharedDevices.sharedDevices);

    const [data, setData] = useState(sharedDevices.map((d: any) => ({id: d.deviceId, rowData: d})));
    const [searchText, setSearchText] = useState('');

    const onSearchChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(evt.target.value);
    };

    const isSearchHit = (dataRow: any) => {
        return (
            dataRow.rowData.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1 ||
            dataRow.rowData.os.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
        );
    };

    const getFilteredData = () => {
        return data.filter(isSearchHit);
    };

    const onRowClick = (evt: MouseEvent, id: string) => {
        console.log(`${id} clicked! (cell ${evt.target})`);
    };

    const searchIcon = <DotIcon iconId="search"/>;
    const toolbar = (
        <DotActionToolbar variant="regular">
            <div style={{width: '50%'}}>
                <DotTypography variant="h2">Shared Devices</DotTypography>
            </div>
            <div style={{width: '50%'}}>
                <div style={{float: 'right'}}>
                    <DotInputText endIcon={searchIcon}
                                  fullWidth={false}
                                  id="search"
                                  name="search"
                                  onChange={onSearchChange}
                                  placeholder="Search"/>
                </div>
            </div>
        </DotActionToolbar>
    );

    const columns = [
        {
            id: "status",
            label: "Status"
        },
        {
            id: "name",
            label: "Name"
        },
        {
            id: "os",
            label: "OS"
        },
        {
            id: "version",
            label: "Version"
        }
    ];

    return (
        <DotTable data={searchText && searchText.length > 0 ? getFilteredData() : data}
                  onRowClick={onRowClick}
                  order="asc"
                  orderBy="status"
                  maxHeight="calc(100% - 65px)"
                  toolbar={toolbar}
                  columns={columns}/>
    );
};

export default SharedDevices;