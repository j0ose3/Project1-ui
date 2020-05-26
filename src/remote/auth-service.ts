import {p1} from './project1-client';

export async function authenticate(username:string, password: string){

    let resp = await p1.post('/auth', {username, password});
    return await resp.data;
}