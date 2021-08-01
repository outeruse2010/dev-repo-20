import {post_request} from '../utils/api_utils';

export const fetch_customer_areas = async (input) => {
    const req = post_request('fetch_customer_areas', input)
    const res = await fetch(req);
    return res.json();
};
