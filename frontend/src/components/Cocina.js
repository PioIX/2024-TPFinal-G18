"use client"

export default function Cocina (props){
    const foto= "/images/" + props.img;

    return(
        <>
            <div>
                <h1> Cocina </h1>
                <img src={foto}/>
            </div>
        </>
    )
}

