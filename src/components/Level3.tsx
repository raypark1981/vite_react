import React, { useContext } from 'react'
import { useStore } from '@/store/StoreHandler'
import { AppContext } from '@/context/AppContext'

type Level3Props = {
    name?: string 
}

const Level3 = ({ name }: Level3Props) => { 

    const { themeColor, changeThemeColor } = useContext(AppContext);
    const { count, text } = useStore();

    console.log('level3 rendered')
    return (<div>
        <div>Level3</div>
        {name + ' ' + text}

        <div>
            <button onClick={() => changeThemeColor('light')}>Change Theme</button>
        </div>
    </div>)
}

export default React.memo(Level3);