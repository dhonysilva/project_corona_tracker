import axios from 'axios';
//import CountryPicker from '../components/CountryPicker/CountryPicker';

var url = 'https://brasil.io/api/dataset/covid19/caso/data/'

export const fetchData = async (state) => {
    let changeableUrl = url;

    if(state) {
        changeableUrl = `${url}?is_last=True&state=${state}&place_type=state`;
    }

    try {
        const { data: { confirmed, /*recovered, */deaths, date } } = await axios.get(changeableUrl);

        return { confirmed, /*recovered, */deaths, date };

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async() => {
    try {
        var dataDate = [];
        var dataNew;
        do {
            var data = await axios.get(`${url}`);
            dataNew = data.data.results;
            for(var i=0;i<dataNew.length;i++) {
                if(dataDate[dataNew[i].date] != undefined) {
                    dataDate[dataNew[i].date].confirmed += dataNew[i].confirmed;
                    dataDate[dataNew[i].date].deaths += dataNew[i].deaths;
                    dataDate[dataNew[i].date].date = dataNew[i].date;
                } else {
                    var newOb = {confirmed: dataNew[i].confirmed, deaths: dataNew[i].deaths, date: dataNew[i].date}
                    dataDate[dataNew[i].date] = newOb;
                }
            }
            url = data.data.next;
        } while(data.data.next != null);

        var modifiedData = [];
        for(var d in dataDate) {
            modifiedData.push(dataDate[d]);
        }
    
        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const {data: { state }} = await axios.get(`${url}&place_type=state`);
        return state.map((state) => state.state);
    } catch (error) {
        console.log(error);
    }
}