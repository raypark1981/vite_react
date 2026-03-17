import React from 'react'
import Level3 from '@/components/Level3'
type Level2Props = {

}
const Level2 = ({ }: Level2Props) => { 
    console.log("level2 rendered")

    const array = [
        { id: 't01', selectedValue: [{ id: 't01_1' }, { id: 't01_2' }] },
        { id: 't02', selectedValue: [{ id: 't02_1' }, { id: 't02_2' }] }
    ]
    
    const selected = array.find(item => item.id == 't00'); 
    
    console.log(selected?.selectedValue);
    return (
        <div>
            <div>Level2</div>
            <Level3 selectedValue={selected?.selectedValue}></Level3>
        </div>
    )
}

export default React.memo(Level2)