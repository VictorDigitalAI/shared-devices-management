import "./Dashboard.scss";

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_V1_URL, TOKEN_KEY} from '../../constants/constants';
import {SharedDeviceDto} from '../../models/shared.models';
import {Chart} from 'react-google-charts';
import Loader from '../../components/Loader/Loader';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../constants/routes';

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
        }).catch(() => {
            setIsLoading(false);
            navigate(ROUTES.MANGER_NOT_AVAILABLE);
        });
    }

    const convertSharedDevicesDataToPieChartData = (sharedDevices: SharedDeviceDto[]) => {
        const chartData: any[][] = [];

        sharedDevices.forEach(device => {
            const index = chartData.findIndex(chart => chart[0] === device.status);
            if (index > -1) {
                chartData[index][1] = chartData[index][1] + 1;
            } else {
                chartData.push([device.status, 1]);
            }
        })
        console.log(chartData);

        // @ts-ignore
        setPieChartData(chartData);
    }

    const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
    };

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div>
            <Chart chartType="PieChart"
                   width="100%"
                   height="400px"
                   data={pieChartData}
                   options={options}
            />
        </div>
    );
};

export default Dashboard;