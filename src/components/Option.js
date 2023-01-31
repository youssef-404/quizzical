

export default function Option(props){
    return(
        <div className={
            `option 
            ${props.isClicked?"option-clicked":""}`
        }
        >
            {props.decodeHtmlCharCodes(props.value)}
        </div>
    )
}