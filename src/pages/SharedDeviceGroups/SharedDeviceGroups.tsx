import './SharedDeviceGroups.scss';
import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {DotActionToolbar, DotButton, DotDialog, DotIcon, DotInputText, DotTable, DotTypography} from '@digital-ai/dot-components';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import {BASE_V1_URL} from '../../constants/constants';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';
// @ts-ignore
import {NotificationManager} from 'react-notifications';
import {SharedDeviceGroupDto} from '../../models/groups.model';
import {SharedDeviceDto} from '../../models/shared.models';

const SharedDeviceGroups = () => {

    const navigate = useNavigate();
    const [sharedDeviceGroups, setSharedDeviceGroups] = useState<SharedDeviceGroupDto[]>([]);
    const [sharedDevices, setSharedDevices] = useState<SharedDeviceDto[]>([]);
    const [devicesForAssign, setDevicesForAssign] = useState<any>([]);
    const [tableData, setTableData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDeviceGroup, setSelectedDeviceGroup] = useState<any>();
    const [lastSelected, setLastSelected] = useState<any>();
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false);
    const [isAssignDialogVisible, setIsAssignDialogVisible] = useState(false);

    useEffect(() => {
        fetchSharedDeviceGroups();
        fetchSharedDevices();
    }, []);

    const fetchSharedDeviceGroups = () => {
        setIsLoading(true);
        axios.get(BASE_V1_URL + "/shared-device-groups").then(response => {
            setSharedDeviceGroups(response.data);
            setTableData(response.data.map((d: any) => {
                d.devicesCount = d.devices?.length || 0;
                return ({id: d.id, rowData: d});
            }));
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            navigate(ROUTES.MANGER_NOT_AVAILABLE);
        });
    }

    const fetchSharedDevices = () => {
        axios.get(BASE_V1_URL + "/devices").then(response => {
            setSharedDevices(response.data);
        }).catch(() => {
            NotificationManager.error("Shared Devices were not received");
        });
    }

    const onSearchChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(evt.target.value);
    };

    const isSearchHit = (dataRow: any) => {
        return (
            dataRow.rowData.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
        );
    };

    const getFilteredData = () => {
        return sharedDeviceGroups.filter(isSearchHit);
    };

    const onRowClick = (evt: MouseEvent, id: string) => {
        if (lastSelected) {
            lastSelected.classList.remove('selected');
        }
        const target = evt.currentTarget;
        target.classList.add('selected');
        setLastSelected(target);
        setSelectedDeviceGroup(sharedDeviceGroups.find(d => d.id === id));
    };

    const deleteButtonHandler = () => {
        setIsDeleteDialogVisible((prevState) => !prevState);
    }

    const createButtonHandler = () => {
        setIsCreateDialogVisible((prevState) => !prevState);
    }

    const assignButtonHandler = () => {
        if (!isAssignDialogVisible) {
            const currentGroupDevices = sharedDeviceGroups.find(g => g.id === selectedDeviceGroup.id)?.devices || [];
            const notAssignedDevices = sharedDevices.filter(d => !currentGroupDevices.some((id: string) => id === d.deviceId));
            setDevicesForAssign(notAssignedDevices.map((d: any) => ({id: d.deviceId, rowData: d})));
        }
        setIsAssignDialogVisible((prevState) => !prevState);
    }

    const onCheckRowChangeHandler = (event: any) => {
        console.log('onCheckRowChangeHandler', event);
    }

    const submitDeleteHandler = (id: string) => {
        axios.delete(BASE_V1_URL + `/shared-device-groups/${id}`)
            .then(() => {
                setIsDeleteDialogVisible(false);
                NotificationManager.info(`Devices group ${selectedDeviceGroup.name} deleting was started. This operation take the time. `);
                setSelectedDeviceGroup(undefined);
                fetchSharedDeviceGroups();
            })
            .catch(err => NotificationManager.error(err.message));
    }

    const submitCreateHandler = () => {
        axios.post(BASE_V1_URL + `/shared-device-groups`, {name: newGroupName})
            .then(() => {
                setIsCreateDialogVisible(false);
                NotificationManager.info(`Devices group ${newGroupName} was created successfully.`);
                setNewGroupName('');
                fetchSharedDeviceGroups();
            })
            .catch(err => NotificationManager.error(err.message));
    }

    const submitAssignHandler = () => {
        console.log('submitAssignHandler');
    }

    const newGroupNameHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setNewGroupName(value);
    }

    const searchIcon = <DotIcon iconId="search"/>;
    const toolbar = (
        <DotActionToolbar className="table-toolbar" variant="regular">
            <div className="table-title">
                <DotTypography variant="h2">Shared Device Groups</DotTypography>
            </div>
            <div className="toolbar-search-actions">
                <DotButton onClick={createButtonHandler}>Create</DotButton>
                <DotButton onClick={assignButtonHandler} disabled={!selectedDeviceGroup}>Assign Device</DotButton>
                <DotButton disabled={!selectedDeviceGroup} onClick={deleteButtonHandler}>Delete</DotButton>
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
            id: "id",
            label: "Group ID",
            sortable: false
        },
        {
            id: "name",
            label: "Group Name"
        },
        {
            id: "devicesCount",
            label: "Number Of Devices"
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
                      orderBy="id"
                      maxHeight="calc(100% - 65px)"
                      toolbar={toolbar}
                      columns={columns}/>

            <DotDialog open={isDeleteDialogVisible}
                       onCancel={deleteButtonHandler}
                       onSubmit={() => submitDeleteHandler(selectedDeviceGroup.id)}
                       title="Delete Shared Devices Group">
                <div className="delete-question">Are you sure you want to delete <span>{selectedDeviceGroup?.name}</span> ?</div>
            </DotDialog>

            <DotDialog open={isCreateDialogVisible}
                       onCancel={createButtonHandler}
                       onSubmit={submitCreateHandler}
                       submitButtonProps={{
                           disabled: !newGroupName
                       }}
                       title="Create Shared Devices Group">
                <DotInputText id="group-name"
                              name="groupName"
                              label="Name"
                              value={newGroupName} onChange={newGroupNameHandler}/>
            </DotDialog>

            <DotDialog open={isAssignDialogVisible}
                       onCancel={assignButtonHandler}
                       onSubmit={submitAssignHandler}
                       title="Assign Device To The Group">
                <DotTable data={devicesForAssign}
                          onRowClick={onRowClick}
                          multiSelect={{
                              onCheckRowChange: onCheckRowChangeHandler
                          }}
                          order="asc"
                          orderBy="id"
                          maxHeight="100%"
                          columns={columns}/>
            </DotDialog>
        </>
    );
};

export default SharedDeviceGroups;
