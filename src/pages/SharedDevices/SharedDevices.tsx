import './SharedDevices.scss';
import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {DotActionToolbar, DotIcon, DotInputSelect, DotInputText, DotTable, DotTypography} from '@digital-ai/dot-components';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import {BASE_V1_URL, TOKEN_KEY} from '../../constants/constants';
import {useNavigate} from 'react-router-dom';
import {SharedDeviceDto} from '../../models/shared.models';
import {ROUTES} from '../../constants/routes';

const SharedDevices = () => {

    const navigate = useNavigate();
    const [sharedDevices, setSharedDevices] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [statusFilterOptions, setStatusFilterOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(BASE_V1_URL + "/devices", {
            headers: {
                'Authorization': `Basic ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then(response => {
            setSharedDevices(response.data);
            setTableData(response.data.map((d: any) => ({id: d.deviceId, rowData: d})));
            setStatusFilterOptions(response.data.reduce((accumulator: string[], current: SharedDeviceDto) => {
                if (accumulator.indexOf(current.status) === -1) {
                    accumulator.push(current.status);
                }
                return accumulator;
            }, ['All']));
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
            navigate(ROUTES.MANGER_NOT_AVAILABLE);
        });
    }, []);

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
        return sharedDevices.filter(isSearchHit);
    };

    const filterByStatusHandler = (event: any) => {
        const filteredData = sharedDevices
            .filter((d: SharedDeviceDto) => d.status == event.target.value)
            .map((d: SharedDeviceDto) => ({id: d.deviceId, rowData: d}));
        setTableData(filteredData as any);
    }

    const onRowClick = (evt: MouseEvent, id: string) => {
        console.log(`${id} clicked! (cell ${evt.target})`);
    };

    const searchIcon = <DotIcon iconId="search"/>;
    const toolbar = (
        <DotActionToolbar className="table-toolbar" variant="regular">
            <div className="table-title">
                <DotTypography variant="h2">Shared Devices</DotTypography>
            </div>
            <div className="toolbar-filters">
                <DotInputSelect options={statusFilterOptions}
                                onChange={filterByStatusHandler}
                                id="status filter"
                                name="statusFilter"
                                label="Status filter"/>
            </div>
            <div className="toolbar-search">
                <DotInputText endIcon={searchIcon}
                              fullWidth={false}
                              id="search"
                              name="search"
                              onChange={onSearchChange}
                              placeholder="Search"/>
            </div>
        </DotActionToolbar>
    );

    const columns = [
        {
            id: "status",
            label: "Status"
        },
        {
            id: "deviceId",
            label: "ID",
            sortable: false
        },
        {
            id: "name",
            label: "Name"
        },
        {
            id: "os",
            label: "OS",
            sortable: false
        },
        {
            id: "version",
            label: "Version"
        },
        {
            id: "deviceHost",
            label: "Device Host"
        },
        {
            id: "placementConstraints",
            label: "Placement Constraints"
        },
        {
            id: "errorCode",
            label: "Error Code",
            sortable: false
        }
    ];

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <DotTable data={tableData}
                  onRowClick={onRowClick}
                  order="asc"
                  orderBy="status"
                  maxHeight="calc(100% - 65px)"
                  toolbar={toolbar}
                  columns={columns}/>
    );
};

export default SharedDevices;