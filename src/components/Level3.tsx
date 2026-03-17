import React, { useContext, useState } from 'react'
import { useStore } from '@/store/StoreHandler'
import { AppContext } from '@/context/AppContext'

type Level3Props = {
    name?: string 
    selectedValue?: any[]
}

const Level3 = ({ name, selectedValue }: Level3Props) => { 
    
    console.log('selectedValue ', selectedValue)
    const [ selectedValueState, useSelectedValueState ] = useState<Set<any>>(new Set(selectedValue));
    
    const appContext = useContext(AppContext);

    if (!appContext) {
        throw new Error('AppContext 없음');
    }

    const {  changeThemeColor } = appContext;
    const { text } = useStore();


    console.log('level3 rendered')
    console.log('selectedValueState in level3 ', selectedValueState)
    
    return (<div>
        <div>Level3</div>
        {name + ' ' + text}

        <div>
            <button onClick={() => changeThemeColor('light')}>Change Theme</button>
        </div>
    </div>)
}

export default React.memo(Level3);