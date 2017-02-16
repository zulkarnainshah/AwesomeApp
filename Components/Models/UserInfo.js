/**
 * Created by zulkarnainshah on 15/02/17.
 */

import Local from "./Local.js"

export default class UserInfo extends Object {
    username: string;
    id: int;
    local: Local = new Local();

    updateValues = (object) =>{
        this.username = object.username;
        this.id = object.id;
        this.local = object.local;
    }

}