"use client"

export default function Mostrador (props){
    const foto= "/images/" + props.img;

    return(
        <>
            <div>
                <h1> Mostrador </h1>
                <img src={foto}/>
            </div>
        </>
    )
}

