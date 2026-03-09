import React from 'react'
import Level2 from '@/components/Level2'

type Level1Props = {
    name?:string
}

const Level1 = ({ }: Level1Props) => {

    console.log('Level1 rendered'); 

    return (
        <div>
            <div>Level1</div>
            <Level2></Level2>
        </div>)
}
 


export default React.memo(Level1);