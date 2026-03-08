import React, {  useEffect } from 'react';
import { useCommonPopupStore } from '@/store/CommonPopup';
type CommonPopupContextProps = {
    contents?: string 
}

// React.FC 함수형 컴포넌트는 props를 받는 컴포넌트 타입이다.  
const CommonPopupContext: React.FC<CommonPopupContextProps> = () => { 
    // 위에코드는 매 새로운 객체를 꺼내는 거라, store가 매 새로 받는 거여서, 무한 렌더링 됨 아래 처럼 하나만 꺼내야됨
    // const { content } = useCommonPopupStore((state) => ({ content: state.content })); 
    // const { content } = useCommonPopupStore((state) => ( state.content ));

    // 이건 리랜더링이 안일어남
    //  const { open } = useCommonPopupStore((state) => state.open);

    // // 이건 리렌더링이 일어남: 이유가 하나만 뺀거 같지만 그냥 useCommonPopupStore(); 전체를 뺀거랑 같다 selector (state) => state.속성 을 써야 되는 이유
    // const { open } = useCommonPopupStore();
    // console.log('common popup context rendered');

    useEffect(() => { 

    
    // console.log('common popup context uesEffect rendered');
    
    }, [])
    
    return (<div > 
                    여긴 자식 커먼 팝업

                    
                </div>
    )
}

export default React.memo(CommonPopupContext);
