import axios from "axios";

const getToken = async () => {
    let clientID: string | undefined = process.env.ClientIDTwitch;
    let clientSecret: string | undefined = process.env.clientSecret;
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`;
    return new Promise(async (resolve, reject) => {
        await axios
            .post(url)
            .then((res) => {
                token = res.data.access_token;
                return resolve("");
            })
            .catch((error) => {
                return reject(error);
            });
    });
};

export const validateToken = async () => {
    let url = `https://id.twitch.tv/oauth2/validate`;
    return new Promise <string>(async (resolve, reject) => {
        await axios
            .get(url, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                return resolve("Token Successful");
            })
            .catch((error) => {
                getToken().then(res => {
                    return resolve("Token restart successful");
                }).catch(err => {
                    return reject("Invalid")
                })
            });
    });
};


export let token: string = "";
export default getToken;

