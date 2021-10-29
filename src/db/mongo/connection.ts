import { connect } from "mongoose";

const db = async (url: string) => {
    return connect(url);
};
export default db;
