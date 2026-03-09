import React, { useMemo, useState, useCallback, useContext} from 'react'
import Level1 from '@/components/Level1'
import { AppContext } from '@/context/AppContext'
import { useStore } from '@/store/StoreHandler'

// 함수 선언언 export default function 함수명
// export default function HooksPage(): React.JSX.Element { 
//     return <></>
// }

type HooksProps = {
    name?: string,
    age?: number
}

// const HooksPage: React.FC<HooksProps> = ({name, age}) => { 
//     return <div>{name} {age}</div>
// }

const HooksPage = ({ name, age }: HooksProps): React.JSX.Element => { 
    const appContext = useContext(AppContext);
    const { text, changeText} = useStore();

    if (!appContext)
        return (<div>app context 없음</div>)

    const { themeColor } = appContext;

    console.log(`Hookspage rendered ${name} ${age}`)

    const [count, setCount] = useState<number>(0);
    const [other_count, setOtherCount] = useState<number>(0);

    const { name_age } = useMemo<{ name_age: string}>(() => {
        console.log('hookpage in first useMemo ' )
        const _name_age: string  = `나의 나이는 ${count}`
        return {
                name_age: _name_age
        } 
     }, [count])

    const { other_age } = useMemo<{other_age:string}>(() => { 

        console.log('hookpage in second useMemo')
        const _other_age = `나의 other age ${other_count}`
        
        return {other_age: _other_age}
    }, [other_count])

    const callBackTest = useCallback( () => { 
        console.log(`callback testing 나의 나이는 ${count}, 나의 other age ${other_count }`)

    }, [other_count])

    // callBackTest();
    return (
        <div style={{backgroundColor: themeColor, padding:'20px'}}>
            <div>name_age값 : {name_age}</div>
            <div>other_age값 : {other_age}</div>
            <div>클릭하는 값: {count}</div>
            <button onClick={() => { setCount((prev) => prev + 1) }}>Click me 함수 직접 넣기 </button>
            <button onClick={() => setOtherCount(prev => prev + 1)}>Click me ohter Button</button>
            <button onClick={() => callBackTest()} > callback testing</button>
            <button onClick={() => changeText('Hello, Zustand!')} > store testing</button>
            {/* <button onClick={}>Click me 함수 안에 함수 넣기</button> */}
            <Level1 name={themeColor}></Level1>
        </div>)
}





// 함수형 컴포넌트는
// const HooksPage: React.FC<HooksProps> = ({name}) => { 
//     return <div>{name}</div>
// }

export default HooksPage;