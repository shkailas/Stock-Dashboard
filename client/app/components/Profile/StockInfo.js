import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

const StockInfo = (props) => {
    const {
        data,
    } = props;

    const ticker = data['Meta Data']['2. Symbol']
    const lastRefreshed = data['Meta Data']['3. Last Refreshed']
    const timezone = data['Meta Data']['5. Time Zone']

    const rows = [];
    const timeSeries = data['Time Series (Daily)'];

    // key is the date
    for (var key in timeSeries) {
        if(timeSeries[key]) {
            var finData = timeSeries[key];
            const open = finData['1. open'];
            const high = finData['2. high'];
            const low = finData['3. low'];
            const close = finData['4. close'];
            const volume = finData['5. volume'];

            rows.push({
                date: key,
                open,
                high,
                low, 
                close,
                volume,
            });
        }
    }

    console.log(rows);


    return (
        
        <div>
            
            <p>{ticker}</p>
            <p>{lastRefreshed}</p>
            <p>{timezone}</p>
            <br />


            <LineChart width={1000} height={800} data={rows} 
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
            
            <XAxis dataKey="date" />
            <YAxis domain={[200,300]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="open"
                stroke="#8884d8"
                dot={false}
            />
            <Line type="monotone" dataKey="high" stroke="#82ca9d" dot={false}/>
            <Line type="monotone" dataKey="low" stroke="#B4045F" dot={false}/>
            <Line type="monotone" dataKey="close" stroke="#868A08" dot={false}/>
            </LineChart>

        </div>
    );
}

export default StockInfo;