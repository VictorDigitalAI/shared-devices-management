import "./Dashboard.scss";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_V1_URL, TOKEN_KEY} from '../../constants/constants';
import {SharedDeviceDto} from '../../models/shared.models';
import {Chart} from 'react-google-charts';
import Loader from '../../components/Loader/Loader';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';
// @ts-ignore
import {NotificationManager} from 'react-notifications';

const Dashboard = () => {

    const [pieChartData, setPieChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSharedDevices();
    }, []);

    const fetchSharedDevices = () => {
        axios.get(BASE_V1_URL + "/devices", {
            headers: {
                'Authorization': `Basic ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then(response => {
            convertSharedDevicesDataToPieChartData(response?.data);
            setIsLoading(false);
        }).catch(err => {
            NotificationManager.error(err.message);
            setIsLoading(false);
            navigate(ROUTES.MANGER_NOT_AVAILABLE);
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
        // @ts-ignore
        setPieChartData(chartData);
    }

    const options = {
        title: "Shared devices by status",
        is3D: true
    };

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-devices-chart">
                <Chart chartType="PieChart"
                       width="100%"
                       height="400px"
                       data={pieChartData}
                       options={options}/>
            </div>
            <div className="dashboard-devices-chart">
                <Chart chartType="PieChart"
                       width="100%"
                       height="400px"
                       data={pieChartData}
                       options={options}/>
            </div>
            <div className="dashboard-devices-chart">
                <Chart chartType="PieChart"
                       width="100%"
                       height="400px"
                       data={pieChartData}
                       options={options}/>
            </div>
            <div className="dashboard-devices-chart">
                <Chart chartType="PieChart"
                       width="100%"
                       height="400px"
                       data={pieChartData}
                       options={options}/>
            </div>
        </div>
    );
};

export default Dashboard;
