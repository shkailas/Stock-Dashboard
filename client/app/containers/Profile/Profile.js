import React, { Component } from 'react';
import StockInfo from '../../components/Profile/StockInfo';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            error:null,
            results: [],
        };

        this.fetchProfileStockInfo = this.fetchProfileStockInfo.bind(this);
    }

    componentWillMount() {
        this.fetchProfileStockInfo();
    }

    fetchProfileStockInfo() {
        console.log('fetchProfileStockInfo');
        fetch('/api/stock/portfolio', { method: 'POST' })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState( {
                    isLoading: false,
                    results: json.results,

                })
            } else {
                this.setState({
                    isLoading: false,
                    error:json.message,
                });
            }
        });
    }

    render () {
        const {
            error, 
            isLoading,
            results,
        } = this.state;

        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div style={{ backgroundColor: 'red' }}>
                    <p style= {{ color: '#fff'}}>{error}</p>
                </div>
            );
        }
        //console.log(results[0])
        return (
            <div>
                <p>Profile</p>
                
                {
                    results.map(result => <StockInfo data={result} key={result['Meta Data']['2. Symbol']}/> )
                }
                
            </div>
        );
    }
}

export default Profile;