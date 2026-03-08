type Level3Props = {
    name?: string 
}

const Level3 = ({ name }: Level3Props) => { 
    console.log('level3 rendered')
    return (<div>
        <div>Level3</div>
        {name}
    </div>)
}

export default Level3;