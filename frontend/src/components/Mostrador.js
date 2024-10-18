"use client"

export default function Mostrador (props){
    const foto= "/images/" + props.img;

    return(
        <>
            <div>
                <img src={foto}/>
            </div>
        </>
    )
}

