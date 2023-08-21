import './SharedDeviceGroups.scss';
import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {DotActionToolbar, DotIcon, DotInputText, DotTable, DotTypography} from '@digital-ai/dot-components';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import {BASE_V1_URL, TOKEN_KEY} from '../../constants/constants';

const SharedDeviceGroups = () => {

    const [SharedDeviceGroups, setSharedDevices] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(BASE_V1_URL + "/shared-device-groups", {
            headers: {
                'Authorization': `Basic ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then(response => {
            setTableData(response.data.map((d: any) => {
                d.devices = d.devices?.length || 0;
                return ({id: d.id, rowData: d});
            }));
            setIsLoading(false);
        }).catch(err => console.error(err));
    }, []);

    const onSearchChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(evt.target.value);
    };

    const isSearchHit = (dataRow: any) => {
        return (
            dataRow.rowData.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
        );
    };

    const getFilteredData = () => {
        return SharedDeviceGroups.filter(isSearchHit);
    };

    const onRowClick = (evt: MouseEvent, id: string) => {
        console.log(`${id} clicked! (cell ${evt.target})`);
    };

    const searchIcon = <DotIcon iconId="search"/>;
    const toolbar = (
        <DotActionToolbar variant="regular">
            <div style={{width: '50%'}}>
                <DotTypography variant="h2">Shared Device Groups</DotTypography>
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
            id: "id",
            label: "Device ID"
        },
        {
            id: "name",
            label: "Group Name",
            sortable: false
        },
        {
            id: "devices",
            label: "Number Of Devices"
        }
    ];

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <DotTable data={tableData}
                  onRowClick={onRowClick}
                  order="asc"
                  orderBy="id"
                  maxHeight="calc(100% - 65px)"
                  toolbar={toolbar}
                  columns={columns}/>
    );
};

export default SharedDeviceGroups;
