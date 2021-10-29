import axios from "axios";
import { token } from "./tokenAuthTwitch";

export const getChannelByName = async (name: string) => {
    let url = `https://api.twitch.tv/helix/search/channels?query=${name}`;
    let params2 = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Client-ID": process.env.ClientIDTwitch || ""
        }
    }
    return getAxios(url, params2);

};
export const getTopGames = async () => {
    let url = `https://api.twitch.tv/helix/games/top`;
    let params2 = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Client-ID": process.env.ClientIDTwitch || ""
        }
    }
    return getAxios(url, params2);

};

interface params {
    headers: {
        Authorization: string,
        "Client-ID": string
    }
}

const getAxios = async (url: string, params: params) =>{
    return new Promise <object>(async (resolve, reject) => {
        await axios
            .get(url, params)
            .then((res: any) => {
                return resolve(res.data);
            })
            .catch((error: any) => {
                reject("error")
            });
    });
}

export default getChannelByName;

