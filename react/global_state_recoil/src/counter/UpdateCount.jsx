import React from 'react'

import {atom, useRecoilState, useResetRecoilState} from 'recoil'

export const countAtom = atom({
    key: 'count_atom',
    default: 0
});

const UpdateCount = () => {
    
    const [count, setCount] = useRecoilState(countAtom);
    const resetCount = useResetRecoilState(countAtom);

    return (
        <div>
            <div style={{'margin': '20px'}}><h3>Count Value:</h3> {count}</div>
            <div>
                <button onClick={()=> setCount(count+1)}>Increament</button>
                <button onClick={resetCount} >Reset </button>
            </div>
            
        </div>
    )
}

export default UpdateCount
