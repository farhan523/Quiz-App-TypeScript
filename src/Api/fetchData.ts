

export async function fetchData(number: number): Promise<{ question: string, correct_answer: string | number, incorrect_answers: string | number[], type: string, difficulty: string, category: string }[]> {
    let res = await (await fetch(`https://opentdb.com/api.php?amount=10&category=${number}&difficulty=easy&type=multiple`))



    let data: {
        response_codes: number,
        results: { category: string, correct_answer: string | number, difficulty: string, incorrect_answers: string | number[], question: string, type: string }[]
    }

    data = await res.json()


    return data.results


}