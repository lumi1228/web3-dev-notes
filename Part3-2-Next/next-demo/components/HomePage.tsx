"use client";
import { useState } from "react";
import Greeting from "@/components/Greeting";
import ConditionalRenderPage from "@/components/ConditionalRenderPage";

function HomePage() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>你点击了 {count} 次</p>
            <button onClick={()=>setCount(count + 1)}> 点我</button>
            <Greeting name="世界"  />
            <Greeting name="Next"  />
            <ConditionalRenderPage />
        </div>
    )
}
export default HomePage;