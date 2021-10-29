import axios from "axios";
import { token } from "./tokenAuthTwitch";

export const getChannelByName = async (name: string) => {
    let url = `https://api.twitch.tv/helix/search/channels?query=${name}`;
    let params = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Client-ID": process.env.ClientIDTwitch || ""
        }
    }
    return new Promise <object>(async (resolve, reject) => {
        await axios
            .get(url, params)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((error) => {
                reject("error")
            });
    });
};


export default getChannelByName;

