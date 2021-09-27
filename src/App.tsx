
import React, { useEffect, useState, MouseEvent } from 'react';
import { fetchData } from './Api/fetchData'
import './App.css'
import comp from './image/comp.png'
import film from './image/film.jpg'
import sport from './image/sports.jpg'
import QuestionCard from './components/questionCard';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
function App() {
  interface dataType {
    category: string,
    correct_answer: string | number,
    difficulty: string,
    incorrect_answers: string | number[],
    question: string,
    type: string
  }

  interface questionType {
    correct_answer: string | number,
  }

  interface IKeys { correct_answer: string | number; incorrect_answers: string[] | number[] }

  let [data, setData] = useState<dataType[]>([{ category: '', correct_answer: '', difficulty: '', incorrect_answers: '', type: '', question: '' }])
  let [loading, setLoading] = useState<boolean>(true)
  let [answer, setAnswer] = useState<string[]>([])
  let [renderOptions, setRenderOptions] = useState<{ options: string[] | number[] }[]>([])
  let [number, setNumber] = useState<any>(0)
  // let [category, setCategory] = useState<number>(0)
  let [loader, setLoader] = useState<boolean>(false)
  // let [dependent, setDependent] = useState<boolean>(true)



  const ctaCategory = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.id)
    let num: number = parseInt(e.currentTarget.id)
    setLoading(false)
    // setCategory(num)
    // setLoading(false)
    // setDependent(false)
    // Do something


    fetchData(num)
      .then((res) => {

        setData(res)

        let tempQuestion = res.map(val => ({
          correct_answer: val.correct_answer,
          incorrect_answers: val.incorrect_answers
        } as IKeys));

        let tempOptions = tempQuestion.map(val => ({
          options: [...val.incorrect_answers, val.correct_answer,]
        } as { options: string[] | number[] }))

        tempOptions = tempOptions.map(val => ({
          options: val.options.sort(() => Math.random() - 0.5)
        } as { options: string[] | number[] }))

        let tempAnswers: string[] = tempQuestion.map(val => (val.correct_answer as string))





        setRenderOptions(tempOptions)
        setAnswer(tempAnswers)
        setLoader(true)
      })

  };

  const increaseNumber = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNumber(
      number + 1
    )
  }

  const homeScreen = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoading(true);
    // setDependent(true);
    setNumber(0)
    setLoader(false)
  }

  if (loading) {
    console.log(data)
    return (
      <div className="App">
        <h1>Quiz App</h1>
        <h2>Select Category</h2>
        <div className="imageDiv">
          <img src={comp} width="150px" id="18" height="150px" onClick={ctaCategory} ></img>
          <img src={film} width="180px" id="11" onClick={ctaCategory} ></img>
          <img src={sport} width="180px" id="21" onClick={ctaCategory}></img>
        </div>
      </div>
    );
  } else {


    return <>
      {loader ? <QuestionCard question={data[number].question} options={renderOptions[number]} increaseNumber={increaseNumber} answer={answer} homescreen={homeScreen} /> : <div className="loading">
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />

      </div>}

    </>



  }

}

export default App;
