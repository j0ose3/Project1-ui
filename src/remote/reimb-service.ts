import {p1} from './project1-client';

export async function getAllReimbs(){

    let resp = await p1.get('/reimbursements', 
    {
        withCredentials: true
    });
    return resp.data;

}

export async function getAllMyReimbs(id: number){
    let resp = await p1.get(`/reimbursements/myreimb/${id}`);
    return resp.data;
}

export async function resolveReimb(id: number, resolver: number, status: number){

    let resp = await p1.put('/reimbursements/status', 
    {
        id,
        resolver,
        status
    });
    return resp.data;
}

export async function getReimbById (id: number) {
    let res = await p1.get(`/reimbursements/${id}`);
    return res.data;
}

export async function updateReimb(id: number, amount: number, description: string, author: number, type: number){

    let resp = await p1.put('/reimbursements', 
    {
        id,
        amount,
        description, 
        author, 
        type
    });
    return resp.data;
}

export async function addNewReimb(amount: number, description: string, author: number, type: number){

    let resp = await p1.post('/reimbursements', 
    {
        amount,
        description, 
        author, 
        type
    });
    return resp.data;
}