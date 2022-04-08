import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import { Form, Table } from 'react-bootstrap';
import { Store } from 'react-notifications-component'
import '../styles/BotAlert.css'


const BotAlert = () => {

    const [allAssets, setAllAssets] = useState([]);
    const [firstAsset, setFirstAsset] = useState('');
    const [secondAsset, setSecondAsset] = useState('');
    const [interval, setFetchInterval] = useState(5);
    const [popRate, setPopRate] = useState(0.0);
    const [diffRate, setDiffRate] = useState(0.0);
    const [initialRate, setInitialRate] = useState(0.0);
    const [rate, setRate] = useState(0.0);
    const [oscillationHistory, setOscillationHistory] = useState<any>([]);

    useEffect(() => {
        axios.get('http://localhost:4000/assets')
            .then((res) => {
                setAllAssets(res.data);
            })
    }, [])

    useEffect(() => {
        setInitial();
    }, [firstAsset, secondAsset]);

    useEffect(() => {
        const timer = setInterval(() => {
            compareRate();
        }, 1000 * interval);

        return(() => {
            clearInterval(timer)
        })

    }, [firstAsset, secondAsset, initialRate, interval, popRate]);

    useEffect(() => {
        if (diffRate) {
            showNotification();
            const history = {
                timestamp: Math.floor(Date.now() / 1000),
                time: new Date().toLocaleString(),
                diffRate: diffRate,
                curRate: rate,
                pair: firstAsset + '-' + secondAsset,
                interval: interval,
                pop: popRate
            }
            setOscillationHistory((oscillationHistory : any) => [...oscillationHistory, history]);
            axios.post('http://localhost:4000/addInfo', history)
                .then(res => {console.log('Success')});
        }
    }, [diffRate]);

    const fetchData = async () => {
        const pair = firstAsset + '-' + secondAsset;
        const params = {
            pair: pair
        };
        const res = await axios.get('http://localhost:4000/price', {params});
        return res.data;
    };

    const setInitial = async () => {   
        const data = await fetchData();
        const rate = (parseFloat(data.ask) + parseFloat(data.bid)) / 2;
        setInitialRate(initialRate => rate);
    }

    const compareRate = async () => {
        const data = await fetchData();
        const rate = (parseFloat(data.ask) + parseFloat(data.bid)) / 2;
        const oscillation = (rate - initialRate) / initialRate * 100;
        if (oscillation >= popRate || oscillation <= -popRate) {
            setRate(rate);
            setDiffRate((rate - initialRate) / initialRate * 100);
        }
    };

    const showNotification = () => {
        Store.addNotification({
            title: "Price Oscillation!",
            message: `Oscillation Rate ${diffRate > 0 ? '+' + diffRate : diffRate}%`,
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true  
            }
        });
    }

    const handleFirstChange = (e: any) => {
        setFirstAsset(e.target.value);
    };

    const handleSecondChange = (e: any) => {
        setSecondAsset(e.target.value);
    };

    const handleIntervalChange = (e: any) => {
        setFetchInterval(e.target.value);
        console.log(e.target.value)
    };

    const handlePopRateChange = (e: any) => {
        setPopRate(e.target.value);
    }

    return (
        <div className="c-botalert-form">
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Currency Pair {initialRate ? `(Initial Rate : ${initialRate})` : ''}</Form.Label>
                        <div className='pairSelect'>
                            <Form.Select role="select" onChange={handleFirstChange}>
                                {
                                    allAssets && allAssets.map((asset : string, index : number) => (
                                        <option key={index}>{asset}</option>
                                    ))
                                }
                            </Form.Select>
                            <Form.Select onChange={handleSecondChange}>
                                {
                                    allAssets && allAssets.map((asset : string, index : number) => (
                                        <option key={index}>{asset}</option>
                                    ))
                                }
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fetch Interval</Form.Label>
                        <Form.Control type="number" min="0" value={interval} onChange={handleIntervalChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Minimum Price Of Percentage</Form.Label>
                        <Form.Control type="number" value={popRate} min="0.0" step="0.01" onChange={handlePopRateChange} />
                    </Form.Group>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Pair</th>
                            <th>Differ</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        oscillationHistory && oscillationHistory.map((history : any, index : number) => {
                            if (index >= oscillationHistory.length - 5) {
                                return (
                                    <tr key={index}>
                                        <td>{history.time}</td>
                                        <td>{history.pair}</td>
                                        <td>{history.diffRate}%</td>
                                        <td>{history.curRate}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                    </Table>
            </Container>
        </div>    
    );
}

export default BotAlert;