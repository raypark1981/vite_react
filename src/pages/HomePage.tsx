import { useRef } from 'react';
import { useCommonPopupStore } from '@/store/CommonPopup';

type HomeProps = {
    name?: string
}

const HomePage: React.FC<HomeProps> = ({ name }: HomeProps) => {
    console.log('home page rendered!!' + name);
    const textRef = useRef<HTMLInputElement | null>(null);
    const homeCount = useRef(0);

    const { isOpen, open } = useCommonPopupStore();

    const increaseCount = () => {
        homeCount.current++;
    }
    const onClickHandle = () => { 
        const context = textRef.current?.value || '여기 홈에서 페이지 열었다 자식아!!'
        open(context);
    }

    if (!isOpen) { 
        textRef.current?.focus();
    }
    
    return (<div> 여기는 홈페이지 
        <input type='text' ref={textRef} placeholder='입력해주세요' />
        <button onClick={() => onClickHandle()}>
            컴먼 팝업 오픈
        </button>
        <button onClick={() => increaseCount()}>ref Increase</button>
        <button onClick={() => console.log(homeCount.current) }>refLog</button>
    </div>)
}

export default HomePage;    