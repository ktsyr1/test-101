

export async function GET(req: Request) {
    console.log({ response: req });

    return new Response(JSON.stringify({ data: "test" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },

    })
}

export async function POST(req: Request) {
    console.log({ response: req });

    return new Response(JSON.stringify({ data: "test" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },

    })
}
