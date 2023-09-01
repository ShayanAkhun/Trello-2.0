import formatTodoForAi from "./formatTodoForAi";

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodoForAi(board);
    console.log("FORMATED TODOS to send>>", todos);



    const response = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ todos })
    })

    const GPTdata = await response.json()
    const { content } = GPTdata

    return content
}

export default fetchSuggestion  