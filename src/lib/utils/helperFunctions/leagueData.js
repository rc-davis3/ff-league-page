import { get } from 'svelte/store';
import {leagueData} from '$lib/stores';
import { leagueID } from '$lib/utils/leagueInfo';

const YAHOO_API_KEY = 'dj0yJmk9TU82TlV5N1YxS2ttJmQ9WVdrOWFrcGxVbmhKVG1vbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTEw';
const YAHOO_API_URL = 'https://fantasysports.yahooapis.com/fantasy/v2/league';

export const getLeagueData = async (queryLeagueID = leagueID) => {
	if(get(leagueData)[queryLeagueID]) {
		return get(leagueData)[queryLeagueID];
	}
    // Fetch data from Yahoo Sports API
    const res = await fetch(`${YAHOO_API_URL}/${queryLeagueID}`, {
        headers: {
            'Authorization': `Bearer ${YAHOO_API_KEY}`
        },
        compress: true
    }).catch((err) => {
        console.error(err);
    });

    if (!res) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json().catch((err) => {
        console.error(err);
    });

    if (res.ok) {
        leagueData.update(ld => {
            ld[queryLeagueID] = data;
            return ld;
        });
        return data;
    } else {
        throw new Error(data);
    }
}

// export const getLeagueData = async (queryLeagueID = leagueID) => {
// 	if(get(leagueData)[queryLeagueID]) {
// 		return get(leagueData)[queryLeagueID];
// 	}
//     const res = await fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}`, {compress: true}).catch((err) => { console.error(err); });
// 	const data = await res.json().catch((err) => { console.error(err); });
	
// 	if (res.ok) {
// 		leagueData.update(ld => {ld[queryLeagueID] = data; return ld});
// 		return data;
// 	} else {
// 		throw new Error(data);
// 	}
// }