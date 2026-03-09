import React from 'react'
import Level3 from '@/components/Level3'
type Level2Props = {

}
const Level2 = ({ }: Level2Props) => { 
    console.log("level2 rendered")
    
    return (
        <div>
            <div>Level2</div>
            <Level3></Level3>
        </div>
    )
}

export default React.memo(Level2)