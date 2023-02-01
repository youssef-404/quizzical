

export default function Option(props){
    console.log(props)
    return(
        <div className={
            `option 
            ${props.isClicked?"option-clicked":""}`
        }
        >
            {props.value}
        </div>
    )
}