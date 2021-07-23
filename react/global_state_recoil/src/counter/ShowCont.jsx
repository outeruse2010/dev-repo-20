import React from 'react'
import {selector, useRecoilValue} from 'recoil';

import {countAtom} from './UpdateCount'

// use selector when you need to find values froom state
// const counterState = selector({
//     key:'counterState',
//     get: ({get}) => {
//         const count = get(countAtom);
//         return count;
//     }
// });

const ShowCont = () => {
    // use selectr name when selector is used 
    // const count = useRecoilValue(counterState);

    const count = useRecoilValue(countAtom);

    return (
        <div>
            <h5>In Show Count Component:</h5>
            <div style={{'margin': '20px'}}>{count}</div>            
        </div>
    )
}

export default ShowCont
