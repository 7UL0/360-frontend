"use client"

import { ReactElement, useState } from "react";

export function ankieta360(steps: ReactElement[]){
    const [currentStepindex, setCurrentStepIndex] = useState(0)

    function dalej() {
        setCurrentStepIndex(i => {
            if(i >= steps.length -1) return i
            return i + 1
        })
    }

    function wstecz() {
        setCurrentStepIndex(i => {
            if(i <= 0) return i
            return i - 1
        })
    }

    function goto(index: number) {
        setCurrentStepIndex(index)
    }

    return{
        currentStepindex,
        step: steps[currentStepindex],
        steps,
        czyPierwszy: currentStepindex === 0,
        czyOstatni: currentStepindex === steps.length - 1,
        goto,
        dalej,
        wstecz,
    }
}