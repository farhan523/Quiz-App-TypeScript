import React, { FC, useState, MouseEvent } from 'react'


interface QuestionCardProps {
    question: string;
    options: { options: number[] | string[]; };
    increaseNumber: any;
    homescreen: any;
    answer: string[];

}


const QuestionCard: FC<QuestionCardProps> = ({ question, options, increaseNumber, answer, homescreen }) => {
    let [display, setDisplay] = useState<boolean>(false)
    let [count, setCount] = useState<number>(0)
    let [score, setScore] = useState<number>(0)
    let [submit, setSubmit] = useState<boolean>(false)
    let [disable, setDisable] = useState<boolean>(false)
    let [scoreboard, setScoreboard] = useState<boolean>(false)
    console.log(options.options)
    console.log(increaseNumber)
    console.log(answer)

    const ctaSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisplay(true)
        setDisable(true)
        console.log(e.currentTarget.innerHTML)
        if (answer[count] == e.currentTarget.innerHTML) {
            setScore(score + 1)

        }

        if (count == 9) {
            setSubmit(true)
        }
        console.log(score)
    };

    const ctaNext = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDisplay(false)
        increaseNumber()
        setCount(count + 1)
        setDisable(false)
    };

    const ctaSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setScoreboard(true)
    };

    if (scoreboard) {
        return (
            <div className="questionCard">
                <h1>SCORE</h1>
                <h2>{score} out of 10</h2>
                <button onClick={homescreen}>BACK</button>
            </div>

        )
    } else {
        return (
            <div className="questionCard">
                <h1>{question} {count + 1} / 10</h1>
                <div className="buttonDiv">
                    {options.options.map((item, index) => { return <button disabled={disable} key={index} onClick={ctaSelect} >{item}</button> })}
                </div>
                { }
                {display && count < 9 ? <button onClick={ctaNext}>NEXT</button> : null}

                {submit ? <button onClick={ctaSubmit}>SUBMIT</button> : null}
            </div>
        )
    }
}

export default QuestionCard
