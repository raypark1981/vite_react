import { useShallow } from 'zustand/react/shallow'
import { useStore } from '@/store/StoreHandler'

const StorePage: React.FC = () => {
    // const test = { a: 1 };



    // const user1 = { user: test }
    // const user2 = { user: test }
    
    // console.log(user1 === user2)

    // const { count, text } = useStore();
    // const { content } = useCommonPopupStore((state) => ({ content: state.content }))


    // 아래와 같이 쓸일은 없지만 묶음 처리 잘못하면 infinite loop 가 도는데 useShallow를 쓰면 같은 값이라 생각하여 리렌더링이 일어나지 않는다.
        
    // const { count, text } = useStore(useShallow((state) => ({
    //     count: state.count,
    //     text: state.text,
    // })));

    // const { count: count1, text: text1 } = useStore(useShallow((state) => ({
    //     count: state.count,
    //     text: state.text,
    // })));

    // console.log(count === count1);

    // infinite loop
    // const { count, text } = useStore((prev) => ({ count: prev.count, text: prev.text}))

    // console.log('rendered StorPage count, text ',count, text)


    // 쓸일이 있을 지 모르지만, 일단 적어 둠
    const temp = useStore(useShallow((state) => ([state.count, state.text])))
    const [count, text] = useStore(useShallow((state) => ([state.count, state.text])))

    console.log(11)
    
    console.log(count, text )
    return (<div>
        <h1>store page</h1>
        <button></button>
    </div>)
}

export default StorePage;