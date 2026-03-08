import { useEffect } from 'react'
import { useCommonPopupStore } from '@/store/CommonPopup'
import CommonPopupContext from '@/components/CommonPopupContext'
type CommonPopupProps = {
    
}

const CommonPopup: React.FC<CommonPopupProps> = () => { 

    const { isOpen, content, close } = useCommonPopupStore();

    console.log('common popup render start')

    useEffect(() => {

        console.log('common popip useEffect')

        if (!isOpen || !content) { 
            console.log('팝을 열릴 필요가 없음')
            return;
        }

        console.log('팝업열리기 전에 하고 싶은거 해라')



        return () => {
            console.log('common popup clean up!!!')
            close();
         }
    }, [])

    const handleClick = () => close();


    return (
        <div>

            <div className={ `bottom-sheet-overlay ${isOpen ? 'show': ''}`} id="overlay"></div>

            <div className={ `bottom-sheet ${isOpen? 'show' : ''}` } id="bottomSheet">
                <div className="sheet-handle"></div>

                <div className="sheet-header">
                <h2 className="sheet-title">공통 바텀시트</h2>
                <button className="close-btn" id="closeBottomSheet" onClick={handleClick}>✕</button>
                </div>

                <div className="sheet-content"> 
                    화면 아래에서 올라오는 공통 바텀시트 예제야.

                    {content}
                    
                <CommonPopupContext ></CommonPopupContext>
                </div>

                 
                <button className="sheet-action-btn" onClick={handleClick}>확인</button>
            </div>
        </div>
    ) 

}

export default CommonPopup;