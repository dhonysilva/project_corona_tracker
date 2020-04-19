import React from 'react';

import {Cards, Chart/*, CountryPicker */} from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';


class App extends React.Component {
    state = {
        data: {},
        state: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    /*handleCountryChange = async (state) => {
        const fetchedData = await fetchData(state);

        this.setState({ data: fetchedData, state: state });
    }    */

    render() {
        const { data, state } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <Chart data={data} state={state} />
            </div>
        );
    }
}

export default App;