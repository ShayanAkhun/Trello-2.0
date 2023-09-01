import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {

    const { todo } = await request.json()
    console.log(todo);

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `when responding,welcome the user always as Mr.Shayan and say welcome to DevQuest Todo App!
                limit the response to 200 charaters`
            }, {
                role: "user",
                content: `Hi there, provide a summary of the following todos. Count how many todos are in each category 
                such as To do, in progress and Done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todo)}`,
            }
        ]
    })

    const { data } = response

    console.log("DATA IS: ", data);
    console.log(data.choices[0].message);


    return NextResponse.json(data.choices[0].message)
}