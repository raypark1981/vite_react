
const ArrayTest = () => { 

    const mapTest: number[] = [1, 2, 3];
    const mapTestObj: any[] = [
        { userid: 1, nm: 'yh' , selectValue: ['t01', 't02']},
        { userid: NaN, nm: 'aa', selectValue: ['t01', 't02', 't03'] }, 
        { userid: 3, nm: 'bb', selectValue: ['t01', 't02', 't03']}
    ]
    // 새 array로 반환
    // const mapCopied = mapTest.map((num, index) => num);
    // const mapCopiedOnlyName = mapTestObj.map((obj, index) => obj.nm);
    // const mapCopiedOnlySelectValue = mapTestObj.map((obj, index) => obj.selectValue)
    
    // console.log('mapCopy ', mapCopied);
    // console.log('mapCopied only name ', mapCopiedOnlyName)
    // console.log('mapCopied SelectValue ', [...new Set(mapCopiedOnlySelectValue.flat())])
    
    const filterUser = mapTestObj.filter(user => user.userid == 2);
    // console.log('filterUser 는 배열임', filterUser);

    const findUser = mapTestObj.find(user => user.userid >= 2);
    // console.log('findUser는 싱글 객체임', findUser);
    // userid == 2, userid > 1 둘다 2하나만 뱉어낸다, 첫번째 조건에서 바로 객체 하나만 내뱉음


    // const someUser = mapTestObj.some(user => {
    //     console.log(user)
    //     return user.userid == 2
    // });
    // const someUser1 = mapTestObj.some(user => user.userid == 1 );
    // // array return 요소 중에 하나라도 일치하면 true를 내뱉는다
    // // 위의 예제처럼, 한번씩 돌다가 그 시점에서 true 리턴하고 멈춤
    // console.log('someUser ', someUser);

    //
    // const everTest = mapTestObj.every(user => {
    //     // return 조건식
    //     console.log(user)
    //     return Number.isFinite(user.userid);

    //     // some 함수 처럼 중간에 하나라도 false가 떨어지면 그 이후는 실행 조차 하지 않는다.
    // })

    // console.log('everTest 모든 조건이 true 일때 true를 반환', everTest)
    
    // 인자들은 (누적값, 현재 obj)
    // const reduceTest = mapTestObj.reduce((ac_user, user) => {
    //     console.log('ac_user ', ac_user, 'user ', user);
    //     return ac_user +=  user.nm + ','

    //     // 초기값이고
    // }, '유저이름은 ')
    
    // // 최종 누적 값이 나온다.
    // console.log('reduceTest ', reduceTest)

    // // reduce로 새 배열 만들기
    // const newReduce = mapTestObj.reduce((users, user) => {
        
    //     if (user.userid > 1) {
    //         users.push(user);
    //     }
    //     //  리턴이 졸라 중요함 안하면, users 가 다음턴에 안넘어옴
    //     return users;
    // }, [])

    // console.log('newReduce ', newReduce)
    
    // includes는 문자, 숫자 배열이든지 문자열에서 문자 비교가 나음

    var includesTestArray = [1, 2, 3, 4]
    var textIncludes = 'hello world'
    // console.log('includesTestArray ', includesTestArray.includes(1))    
    // console.log('textIncludes ', textIncludes.includes('wor'));

console.log('slice   예제 ',includesTestArray.slice(1,3))    


    return (<>
        <div>
            map test
        </div>
    </>)

}

export default ArrayTest;