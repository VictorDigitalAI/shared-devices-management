import './SharedDevices.scss';
import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {
    DotActionToolbar,
    DotButton,
    DotDialog,
    DotIcon,
    DotInputSelect,
    DotInputText,
    DotTable,
    DotTypography,
    TableRowProps
} from '@digital-ai/dot-components';
import Loader from '../../components/Loader/Loader';
import {useNavigate} from 'react-router-dom';
import {SHARED_DEVICE_STATUS, SharedDeviceDto} from '../../models/shared.models';
import axios from 'axios';
import {BASE_V1_URL} from '../../constants/constants';
import {ROUTES} from '../../constants/routes';

const SharedDevices = () => {

    const navigate = useNavigate();

    const [sharedDevices, setSharedDevices] = useState<SharedDeviceDto[]>([]);
    const [filteredSharedDevices, setFilteredSharedDevices] = useState<SharedDeviceDto[]>([]);
    const [tableData, setTableData] = useState<TableRowProps[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [statusFilterOptions, setStatusFilterOptions] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isInfoDialogVisible, setIsInfoDialogVisible] = useState<boolean>(false);
    const [selectedDevice, setSelectedDevice] = useState<SharedDeviceDto>();
    const [lastSelected, setLastSelected] = useState<any>();

    useEffect(() => {
        // prepareTableData(SharedDevicesMock as SharedDeviceDto[]);
        axios.get(BASE_V1_URL + "/devices").then(response => {
            prepareTableData(response.data);
        }).catch(() => {
            setIsLoading(false);
            navigate(ROUTES.MANGER_NOT_AVAILABLE);
        });
    }, []);

    const prepareTableData = (data: SharedDeviceDto[]) => {
        setSharedDevices(data);
        setFilteredSharedDevices(data);
        setTableData(data.map((d: any) => ({id: d.deviceId, rowData: d})));
        setStatusFilterOptions(data.reduce((accumulator: string[], current: SharedDeviceDto) => {
            if (accumulator.indexOf(current.status) === -1) {
                accumulator.push(current.status);
            }
            return accumulator;
        }, ['All']));
        setIsLoading(false);
    }

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
        setIsLoading(true);
        const status = event.target.value;
        let newArr;
        if (status === 'All') {
            newArr = sharedDevices;
        } else {
            newArr = sharedDevices.filter((d: SharedDeviceDto) => d.status == event.target.value);
        }
        setSelectedDevice(undefined);
        setSelectedStatus(status);
        setFilteredSharedDevices(newArr);
        setTableData([...newArr.map((d: any) => ({id: d.deviceId, rowData: d}))]);
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
    }

    const onRowClick = (evt: MouseEvent, id: string) => {
        if (lastSelected) {
            lastSelected.classList.remove('selected');
        }
        const target = evt.currentTarget;
        target.classList.add('selected');
        setLastSelected(target);
        setSelectedDevice(sharedDevices.find(d => d.deviceId === id));
    };

    const infoButtonHandler = () => {
        setIsInfoDialogVisible((prevState) => !prevState);
    }

    const searchIcon = <DotIcon iconId="search"/>;
    const toolbar = (
        <DotActionToolbar className="table-toolbar" variant="regular">
            <div className="table-title">
                <DotTypography variant="h2">Shared Devices</DotTypography>
            </div>
            <div className="toolbar-filters">
                <DotInputSelect options={statusFilterOptions}
                                value={selectedStatus}
                                onChange={filterByStatusHandler}
                                id="status filter"
                                name="statusFilter"
                                label="Status filter"/>
            </div>
            <div className="toolbar-search-actions">
                <DotButton disabled={!selectedDevice} onClick={infoButtonHandler}>Info</DotButton>
                <DotButton disabled={true}>Edit</DotButton>
                <DotButton disabled={!(selectedDevice?.status && (selectedDevice?.status === SHARED_DEVICE_STATUS.DISCONNECTED))}>Delete</DotButton>
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
        <>
            <DotTable data={tableData}
                      onRowClick={onRowClick}
                      order="asc"
                      orderBy="status"
                      maxHeight="calc(100% - 65px)"
                      toolbar={toolbar}
                      columns={columns}/>
            <DotDialog open={isInfoDialogVisible}
                       onCancel={infoButtonHandler}
                       hasPrimaryAction={false}
                       title="Shared Device Info">
                <div className="device-dialog-info">
                    <div>
                        <span className="info-title">Name:</span>
                        <span>{selectedDevice?.name}</span>
                    </div>
                    <div>
                        <span className="info-title">ID:</span>
                        <span>{selectedDevice?.deviceId}</span>
                    </div>
                    <div>
                        <span className="info-title">Host:</span>
                        <span>{selectedDevice?.deviceHost}</span>
                    </div>
                    <div>
                        <span className="info-title">Clouds:</span>
                        <ul className="clouds-list">
                            {selectedDevice?.clouds.map(c => <li key={c}>{c}</li>)}
                        </ul>
                    </div>
                </div>
            </DotDialog>
        </>
    );
};

export default SharedDevices;