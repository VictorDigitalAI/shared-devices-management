import "./Dashboard.scss";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_V1_URL} from '../../constants/constants';
import {SharedDeviceDto} from '../../models/shared.models';
import {Chart} from 'react-google-charts';
import {Card, CardHeader} from "@mui/material";
import Loader from '../../components/Loader/Loader';
import {useNavigate} from 'react-router-dom';
// @ts-ignore
import {NotificationManager} from 'react-notifications';
import {ROUTES} from '../../constants/routes';
import {SharedDeviceGroupDto} from '../../models/groups.model';

const Dashboard = () => {

    const [shredDevicesChartData, setShredDevicesChartData] = useState<unknown[]>([]);
    const [shredDeviceGroupsChartData, setShredDeviceGroupsChartData] = useState<unknown[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [isDocker, setIsDocker] = useState(false);
    const [dockerHost, setDockerHost] = useState("");

    useEffect(() => {
        fetchDashboardData();
        getDockerSwarmStatus();
    }, []);

    const fetchDashboardData = () => {

        const urls = [
            BASE_V1_URL + "/devices",
            BASE_V1_URL + "/shared-device-groups"
        ]

        const requests = urls.map((url: string) => axios.get(url));

        axios.all(requests).then(responses => {
            const devices = responses[0].data;
            const groups = responses[1].data;

            convertSharedDevicesDataToPieChartData(devices);
            convertSharedDeviceGroupsDataToPieChartData(groups);

            setIsLoading(false);
        }).catch(err => {
            NotificationManager.error(err.message);
            setIsLoading(false);
            navigate(ROUTES.MANGER_NOT_AVAILABLE);
        });
    }

    const convertSharedDeviceGroupsDataToPieChartData = (groups: SharedDeviceGroupDto[]) => {
        const chartData: any[][] = [["GROUP", "DEVICES"]];
        groups.forEach(g => chartData.push([g.name, g.devices.length]));
        setShredDeviceGroupsChartData(chartData);
    }

    const getDockerSwarmStatus = () => {
        axios.get(BASE_V1_URL + "/docker")
            .then(response => {
                setIsDocker(response.data[0]?.isConnected)
                setDockerHost(response.data[0]?.host)
            }).catch(err => {
            NotificationManager.error(err.message);
        });
    }

    const convertSharedDevicesDataToPieChartData = (sharedDevices: SharedDeviceDto[]) => {
        const chartData: any[][] = [
            ["STATUS", "DEVICES"],
            ["AVAILABLE", 0],
            ["OFFLINE", 0],
            ["MAINTENANCE", 0],
            ["CONFIGURED", 0],
            ["IN_USE", 0],
            ["DIRTY", 0],
            ["IN_RESET", 0],
            ["DISCONNECTED", 0],
            ["UNUSABLE", 0]
        ];

        sharedDevices.forEach(device => {
            const index = chartData.findIndex(chart => chart[0] === device.status);
            if (index > -1) {
                chartData[index][1] = chartData[index][1] + 1;
            } else {
                chartData.push([device.status, 1]);
            }
        })
        setShredDevicesChartData(chartData);
    }

    if (isLoading) {
        return <Loader/>;
    }

    const optionsSharedDevices = {
        title: "Shared devices by status",
        is3D: true,
        sliceVisibilityThreshold: 0
    };

    const optionsSharedDeviceGroups = {
        title: "Shared devices groups by device count",
        is3D: true,
        sliceVisibilityThreshold: 0
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-devices-chart">
                <Chart chartType="PieChart"
                       width="100%"
                       height="400px"
                       data={shredDevicesChartData}
                       options={optionsSharedDevices}/>
            </div>
            <div className="dashboard-devices-chart">
                <Chart chartType="PieChart"
                       width="100%"
                       height="400px"
                       data={shredDeviceGroupsChartData}
                       options={optionsSharedDeviceGroups}/>
            </div>
            <Card sx={{width: "100%", display: "flex"}}>
                <CardHeader
                    sx={{
                        display: "flex",
                        overflow: "hidden",
                        "& .MuiCardHeader-content": {
                            overflow: "hidden"
                        }
                    }}
                    title={<div>Docker Swarm Status: <div>Host: {dockerHost}</div></div>}
                    titleTypographyProps={{noWrap: true}}
                    subheader={isDocker ? (<div style={{color: 'green'}}>Online</div>) : (
                        <div style={{color: 'red'}}>Offline</div>)}
                    subheaderTypographyProps={{noWrap: true}}
                />
            </Card>
        </div>
    );
};

export default Dashboard;
