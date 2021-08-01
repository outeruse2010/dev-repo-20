import {atom} from 'recoil';
import {post_request} from '../utils/api_utils';

export const cus_area_atom = atom({key: "cus_area_atom", default: []});
export const act_cus_area_atom = atom({key: "act_cus_area_atom", default: {} });

export const fetch_customer_areas = async (input = {}) => {
    const req = post_request('fetch_customer_areas', input);
    const res = await fetch(req);
    const data = res.json();    
    return data;
};

export const add_cus_area = async (cus_area_json) => {
    const req = post_request('add_customer_area', cus_area_json);
    const res = await fetch(req);
    const data = res.json();   
    return data;
}
