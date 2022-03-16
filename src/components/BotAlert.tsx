import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Form, Button } from 'react-bootstrap';
import '../styles/BotAlert.css'

function BotAlert() {

    const [pair, setPair] = useState("BTC-USDT");
    const [interval, setInterval] = useState(5);
    const [porRate, setPorRate] = useState(0.0);
    const [diffRate, setDiffRate] = useState(0.0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = "https://api.uphold.com/v0/ticker/BTC-USD"

        const res = await fetch(proxyUrl + targetUrl);

        console.log(res);
        
    };

    const compareRate = (res: any) => {
        console.log(res.body.json())
    };

    const handlePairChange = (e: any) => {
        setPair(e.target.value);
    };

    const handleIntervalChange = (e: any) => {
        setInterval(e.target.value);
    };

    const handlePorRateChange = (e: any) => {
        setPorRate(e.target.value);
    }

    const handleSubmit = () => {
        console.log(pair, interval, porRate);
    };

    return (
        <div className="c-botalert-form">
            <Container>
                <Form>
                    <Form.Group controlId="form.Name">
                        <Form.Label>Currency Pair</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={handlePairChange} >
                            <option>BTC-USD</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="form.Email">
                        <Form.Label>Fetch Interval</Form.Label>
                        <Form.Control type="number" value="5" onChange={handleIntervalChange}/>
                    </Form.Group>
                    <Form.Group controlId="form.Textarea">
                        <Form.Label>POR</Form.Label>
                        <Form.Control type="text" onChange={handlePorRateChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleSubmit}>
                        Start
                    </Button>
                </Form>
                
            </Container>
        </div>    
    );
}

export default BotAlert;