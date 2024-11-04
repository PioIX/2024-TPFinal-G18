"use client"

import Login from "@/components/Login";
import { useState } from "react";

export default function loginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        console.log(username, password);
    }

    function handleInputs(event) {
        if(event.target.id == "username") {
            setUsername(event.target.value)
        } else if (event.target.id == "password") {
            setPassword(event.target.value)
        }
    }

    return(
    <div>
        <Login onClick={handleLogin} onChange={handleInputs} ></Login>
    </div>
    )
}