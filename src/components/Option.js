

export default function Option(props){
    return(
        <div className={
            `option 
            ${props.isChoosed?"option-clicked":""}`
        }
        onClick={props.toggleSelection}
        >
            {props.value}
        </div>
    )
}